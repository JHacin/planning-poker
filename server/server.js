import { createServer } from "http";
import { server as WebSocketServer } from "websocket";
import {
  USER_LOGIN,
  USER_LOGOUT,
  ADD_SESSION,
  REMOVE_SESSION,
  USER_RECONNECT,
  GENERATE_NEXT_SESSION_ID,
  JOIN_SESSION,
  UPDATE_SESSION_STATUS
} from "../src/redux/actionTypes";
import {
  receiveUserListUpdate,
  receiveSessionListUpdate
} from "../src/redux/actions";
import {
  userListInitialState,
  userInitialState
} from "../src/redux/reducers/users";
import {
  sessionListInitialState,
  sessionInitialState
} from "../src/redux/reducers/sessions";
import {
  USER_STATUS_DISCONNECTED,
  USER_STATUS_CONNECTED,
  SESSION_STATUS_WAITING_FOR_PARTICIPANTS,
  SESSION_STATUS_PENDING_LAUNCH
} from "../src/constants";

const server = new WebSocketServer({
  httpServer: createServer().listen(8000)
});

const clients = {};
const users = { ...userListInitialState };
const sessions = { ...sessionListInitialState };

const sendResponse = (response, targetUser = false) => {
  const message = JSON.stringify(response);

  if (targetUser) {
    clients[targetUser].sendUTF(message);
  } else {
    Object.keys(clients).forEach(client => clients[client].sendUTF(message));
  }
};

const generateNextSessionId = targetUser => {
  sessions.nextSessionId += 1;
  sendResponse(receiveSessionListUpdate(sessions), targetUser);
};

const sendUserListUpdate = () => {
  sendResponse(receiveUserListUpdate(users));
};

const sendSessionListUpdate = (targetUser = false) => {
  sendResponse(receiveSessionListUpdate(sessions), targetUser);
};

const userExists = uuid => {
  return users.uuidList.includes(uuid);
};

const userIsParticipant = uuid => {
  return users.byUuid[uuid].participantIn;
};

const sessionExists = id => {
  return sessions.idList.includes(id);
};

const getSessionModerator = sessionId => {
  return sessions.byId[sessionId].moderator;
};

const sessionIncludesParticipant = (sessionId, userId) => {
  return sessions.byId[sessionId].participants.includes(userId);
};

const addUser = (uuid, parsedMessage) => {
  if (!userExists(uuid)) {
    users.uuidList.push(uuid);
    users.byUuid = {
      ...users.byUuid,
      [uuid]: {
        ...userInitialState,
        uuid,
        username: parsedMessage.payload.username
      }
    };
  }

  users.byUuid[uuid].connectionStatus = USER_STATUS_CONNECTED;

  sendUserListUpdate();
  sendSessionListUpdate(uuid);
};

const removeSession = (id, sendUpdate = true) => {
  delete sessions.byId[id];
  sessions.idList = [...sessions.idList.filter(current => current !== id)];

  if (sendUpdate) {
    sendSessionListUpdate();
  }
};

const removeSessionsModeratedBy = uuid => {
  sessions.idList.forEach(sessionId => {
    if (sessions.byId[sessionId].moderator === uuid) {
      removeSession(sessionId, false);
    }
  });
};

const removeUser = uuid => {
  delete clients[uuid];
  delete users.byUuid[uuid];
  users.uuidList = [...users.uuidList.filter(current => current !== uuid)];
  removeSessionsModeratedBy(uuid);

  sendUserListUpdate();
  sendSessionListUpdate();
};

const removeUserFromSession = uuid => {
  const userParticipantIn = userIsParticipant(uuid);
  const participants = sessions.byId[userParticipantIn].participants.filter(
    participant => participant !== uuid
  );

  sessions.byId[userParticipantIn].participants = [...participants];

  if (!participants.length) {
    sessions.byId[
      userParticipantIn
    ].status = SESSION_STATUS_WAITING_FOR_PARTICIPANTS;
  }
};

const handleDisconnected = uuid => {
  if (userExists(uuid)) {
    users.byUuid[uuid].connectionStatus = USER_STATUS_DISCONNECTED;

    if (userIsParticipant(uuid)) {
      removeUserFromSession(uuid);
    }
  }

  sendUserListUpdate();
  sendSessionListUpdate();
};

const addSession = payload => {
  if (!sessionExists(payload.id)) {
    sessions.idList.push(payload.id);
    sessions.byId = {
      ...sessions.byId,
      [payload.id]: {
        ...sessionInitialState,
        ...payload,
        status: SESSION_STATUS_WAITING_FOR_PARTICIPANTS
      }
    };
    sendSessionListUpdate();
  }
};

const addUserToSession = (sessionId, userId) => {
  if (getSessionModerator(sessionId) !== userId) {
    if (!sessionIncludesParticipant(sessionId, userId)) {
      sessions.byId[sessionId].participants.push(userId);
      users.byUuid[userId].participantIn = sessionId;

      if (
        sessions.byId[sessionId].status ===
        SESSION_STATUS_WAITING_FOR_PARTICIPANTS
      ) {
        sessions.byId[sessionId].status = SESSION_STATUS_PENDING_LAUNCH;
      }
    }
  } else {
    users.byUuid[userId].moderatorOf = sessionId;
  }

  sendUserListUpdate();
  sendSessionListUpdate();
};

const onMessage = (message, uuid) => {
  if (message.type === "utf8") {
    const parsedMessage = JSON.parse(message.utf8Data).message;
    const actionType = parsedMessage.type;

    switch (actionType) {
      case USER_LOGIN:
      case USER_RECONNECT:
        addUser(uuid, parsedMessage);
        break;
      case USER_LOGOUT:
        removeUser(parsedMessage.payload.uuid);
        break;
      case GENERATE_NEXT_SESSION_ID:
        generateNextSessionId(uuid);
        break;
      case ADD_SESSION:
        addSession(parsedMessage.payload);
        break;
      case REMOVE_SESSION:
        removeSession(parsedMessage.payload.id);
        break;
      case UPDATE_SESSION_STATUS:
        sessions.byId[parsedMessage.payload.sessionId].status =
          parsedMessage.payload.status;
        sendSessionListUpdate();
        break;
      case JOIN_SESSION:
        addUserToSession(
          parsedMessage.payload.sessionId,
          parsedMessage.payload.userId
        );
        break;
      default:
        break;
    }
  }
};

const onClose = currentUser => {
  handleDisconnected(currentUser);
};

server.on("request", request => {
  const currentUser = request.resourceURL.query.uuid;
  const connection = request.accept(null, request.origin);
  clients[currentUser] = connection;
  connection.on("message", message => onMessage(message, currentUser));
  connection.on("close", () => onClose(currentUser));
});
