import { createServer } from "http";
import { server as WebSocketServer } from "websocket";
import * as actionTypes from "../src/redux/actionTypes";
import { receiveUserListUpdate, receiveSessionListUpdate } from "../src/redux/actions";
import { userListInitialState, userInitialState } from "../src/redux/reducers/users";
import { sessionListInitialState, sessionInitialState } from "../src/redux/reducers/sessions";
import {
  SESSION_WAITING_FOR_PARTICIPANTS,
  SESSION_PENDING_LAUNCH,
  SESSION_ABORTED
} from "../src/constants";
import { calculateAverage } from "../src/scaleTypes";

const server = new WebSocketServer({
  httpServer: createServer().listen(8000)
});

const clients = {};
const users = { ...userListInitialState };
const sessions = { ...sessionListInitialState };

const sendMessageToClient = (client, message) => {
  clients[client].sendUTF(message);
};

const sendResponse = (response, targetUser = false) => {
  const message = JSON.stringify(response);

  if (targetUser) {
    sendMessageToClient(targetUser, message);
  } else {
    Object.keys(clients).forEach(client => sendMessageToClient(client, message));
  }
};

const generateNextSessionId = targetUser => {
  sessions.nextSessionId += 1;
  sendResponse(receiveSessionListUpdate(sessions), targetUser);
};

const sendUserListUpdate = () => sendResponse(receiveUserListUpdate(users));

const sendSessionListUpdate = (targetUser = false) =>
  sendResponse(receiveSessionListUpdate(sessions), targetUser);

const getUser = id => users.byId[id];

const getSession = id => sessions.byId[id];

const userExists = id => users.idList.includes(id);

const userIsParticipant = id => getUser(id).participantIn;

const sessionExists = id => sessions.idList.includes(id);

const getSessionModerator = id => getSession(id).moderator;

const sessionIncludesParticipant = (session, user) =>
  getSession(session).participants.includes(user);

const setUserProperty = (id, property, value) => {
  getUser(id)[property] = value;
};

const setSessionProperty = (id, property, value) => {
  getSession(id)[property] = value;
};

const getArrayWithoutValue = (arr, value) => [...arr.filter(x => x !== value)];

const addUser = (id, payload) => {
  const { username } = payload;

  if (!userExists(id)) {
    users.idList.push(id);
    users.byId[id] = {
      ...userInitialState,
      id,
      username
    };
  }

  sendUserListUpdate();
  sendSessionListUpdate(id);
};

const removeSession = (id, sendUpdate = true) => {
  delete sessions.byId[id];
  sessions.idList = getArrayWithoutValue(sessions.idList, id);
  if (sendUpdate) {
    sendSessionListUpdate();
  }
};

const removeSessionsModeratedBy = id => {
  sessions.idList.forEach(session => {
    if (getSession(session).moderator === id) {
      removeSession(session, false);
    }
  });
};

const removeUser = id => {
  delete clients[id];
  delete users.byId[id];
  users.idList = getArrayWithoutValue(users.idList, id);
  removeSessionsModeratedBy(id);
  sendUserListUpdate();
  sendSessionListUpdate();
};

const removeUserFromSession = id => {
  const userParticipantIn = userIsParticipant(id);

  setSessionProperty(
    userParticipantIn,
    "participants",
    getArrayWithoutValue(getSession(userParticipantIn).participants, id)
  );

  if (!getSession(userParticipantIn).participants.length) {
    setSessionProperty(userParticipantIn, "status", SESSION_WAITING_FOR_PARTICIPANTS);
  }
};

const handleDisconnected = id => {
  if (userExists(id) && userIsParticipant(id)) {
    removeUserFromSession(id);
  }

  sendUserListUpdate();
  sendSessionListUpdate();
};

const addSession = payload => {
  if (!sessionExists(payload.id)) {
    sessions.idList.push(payload.id);
    sessions.byId[payload.id] = {
      ...sessionInitialState,
      ...payload,
      status: SESSION_WAITING_FOR_PARTICIPANTS
    };
    sendSessionListUpdate();
  }
};

const addUserToSession = payload => {
  const { session, user } = payload;

  if (getSessionModerator(session) !== user) {
    if (!sessionIncludesParticipant(session, user)) {
      getSession(session).participants.push(user);
      setUserProperty(user, "participantIn", session);

      if (getSession(session).status === SESSION_WAITING_FOR_PARTICIPANTS) {
        setSessionProperty(session, "status", SESSION_PENDING_LAUNCH);
      }
    }
  } else {
    setUserProperty(user, "moderatorOf", session);
  }

  sendUserListUpdate();
  sendSessionListUpdate();
};

const provideEstimate = payload => {
  const { id, story, value } = payload;
  const session = getSession(id);
  const { userStories, participants, scaleType } = session;

  userStories.forEach((userStory, index) => {
    if (userStory.id === story) {
      const { estimatesGiven: estimates } = userStories[index];
      estimates.push(value);
      if (estimates.length === participants.length) {
        userStories[index].receivedAllEstimates = true;
        userStories[index].average = calculateAverage(scaleType, estimates);
      }
    }
  });

  sendSessionListUpdate();
};

const resetSessionStories = id => {
  const stories = getSession(id).userStories.map(story => ({
    ...story,
    estimatesGiven: [],
    average: null,
    receivedAllEstimates: false
  }));

  setSessionProperty(id, "userStories", stories);
};

const updateSessionStatus = payload => {
  const { id, status } = payload;
  setSessionProperty(id, "status", status);

  switch (status) {
    case SESSION_ABORTED:
      resetSessionStories(id);
      break;
    default:
      break;
  }

  sendSessionListUpdate();
};

const onMessage = (message, id) => {
  if (message.type === "utf8") {
    const json = JSON.parse(message.utf8Data).message;
    const { type: actionType, payload } = json;

    switch (actionType) {
      case actionTypes.USER_LOGIN:
        addUser(id, payload);
        break;
      case actionTypes.USER_LOGOUT:
        removeUser(payload.id);
        break;
      case actionTypes.GENERATE_NEXT_SESSION_ID:
        generateNextSessionId(id);
        break;
      case actionTypes.ADD_SESSION:
        addSession(payload);
        break;
      case actionTypes.REMOVE_SESSION:
        removeSession(payload.id);
        break;
      case actionTypes.UPDATE_SESSION_STATUS:
        updateSessionStatus(payload);
        break;
      case actionTypes.JOIN_SESSION:
        addUserToSession(payload);
        break;
      case actionTypes.PROVIDE_ESTIMATE:
        provideEstimate(payload);
        break;
      default:
        break;
    }
  }
};

const onClose = id => {
  handleDisconnected(id);
};

server.on("request", request => {
  const client = request.resourceURL.query.id;
  const connection = request.accept(null, request.origin);
  clients[client] = connection;
  connection.on("message", message => onMessage(message, client));
  connection.on("close", () => onClose(client));
});
