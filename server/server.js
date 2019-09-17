import { createServer } from "http";
import { server as WebSocketServer } from "websocket";
import {
  USER_LOGIN,
  USER_LOGOUT,
  ADD_SESSION,
  REMOVE_SESSION,
  USER_RECONNECT,
  GENERATE_NEXT_SESSION_ID,
  JOIN_SESSION
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
  USER_STATUS_CONNECTED
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

const addUser = (uuid, parsedMessage) => {
  if (!users.uuidList.includes(uuid)) {
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

const removeUser = uuid => {
  delete clients[uuid];
  delete users.byUuid[uuid];
  users.uuidList = [...users.uuidList.filter(current => current !== uuid)];

  sessions.idList.forEach(sessionId => {
    if (sessions.byId[sessionId].moderator === uuid) {
      removeSession(sessionId, false);
    }
  });

  sendUserListUpdate();
  sendSessionListUpdate();
};

const handleDisconnected = uuid => {
  if (users.uuidList.includes(uuid)) {
    users.byUuid[uuid].connectionStatus = USER_STATUS_DISCONNECTED;
  }

  sendUserListUpdate();
};

const addSession = payload => {
  if (!sessions.idList.includes(payload.id)) {
    sessions.idList.push(payload.id);
    sessions.byId = {
      ...sessions.byId,
      [payload.id]: {
        ...sessionInitialState,
        ...payload
      }
    };
    sendSessionListUpdate();
  }
};

const updateSession = payload => {
  if (sessions.byId[payload.sessionId].moderator !== payload.userId) {
    sessions.byId[payload.sessionId].participants.push(payload.userId);
    sendSessionListUpdate();
  }
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
      case JOIN_SESSION:
        updateSession(parsedMessage.payload);
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
