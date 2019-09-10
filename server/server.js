import { createServer } from "http";
import { server as WebSocketServer } from "websocket";
import { USER_LOGIN, USER_LOGOUT, ADD_SESSION, REMOVE_SESSION } from "../src/redux/actionTypes";
import {
  receiveUserListUpdate,
  receiveSessionListUpdate
} from "../src/redux/actions";
import { initialState as usersInitialState } from "../src/redux/reducers/users";
import { initialState as sessionsInitialState } from "../src/redux/reducers/sessions";

const server = new WebSocketServer({
  httpServer: createServer().listen(8000)
});

const clients = {};
const users = usersInitialState;
const sessions = sessionsInitialState;
let nextSessionId = 0;

const sendResponse = response => {
  const serializedResponse = JSON.stringify(response);
  Object.keys(clients).forEach(client =>
    clients[client].sendUTF(serializedResponse)
  );
};

const sendUserListUpdate = () => {
  sendResponse(receiveUserListUpdate(users));
};

const sendSessionListUpdate = () => {
  sendResponse(receiveSessionListUpdate(sessions));
};

const addUser = (uuid, parsedMessage) => {
  if (!users.uuidList.includes(uuid)) {
    users.uuidList.push(uuid);
    users.byUuid = {
      ...users.byUuid,
      [uuid]: {
        uuid,
        username: parsedMessage.payload.username
      }
    };
    sendUserListUpdate();
  }
};

const removeUser = uuid => {
  delete clients[uuid];
  delete users.byUuid[uuid];
  users.uuidList = [...users.uuidList.filter(current => current !== uuid)];
  sendUserListUpdate();
};

const addSession = payload => {
  nextSessionId += 1;

  if (!sessions.idList.includes(nextSessionId)) {
    sessions.idList.push(nextSessionId);
    sessions.byId = {
      ...sessions.byId,
      [nextSessionId]: {
        nextSessionId,
        ...payload
      }
    };
    sendSessionListUpdate();
  }
};

const removeSession = id => {
  delete sessions.byId[id];
  users.idList = [...sessions.idList.filter(current => current !== id)];
  sendSessionListUpdate();
};

const onMessage = (message, uuid) => {
  if (message.type === "utf8") {
    const parsedMessage = JSON.parse(message.utf8Data).message;
    const actionType = parsedMessage.type;
    switch (actionType) {
      case USER_LOGIN:
        addUser(uuid, parsedMessage);
        break;
      case USER_LOGOUT:
        removeUser(parsedMessage.payload.uuid);
        break;
      case ADD_SESSION:
        addSession(parsedMessage.payload);
        break;
      case REMOVE_SESSION:
        removeSession(parsedMessage.payload.id);
        break;
      default:
        break;
    }
  }
};

const onClose = currentUser => {
  removeUser(currentUser);
  sendResponse(receiveUserListUpdate(users));
};

server.on("request", request => {
  const currentUser = request.resourceURL.query.uuid;
  const connection = request.accept(null, request.origin);
  clients[currentUser] = connection;

  connection.on("message", message => onMessage(message, currentUser));
  connection.on("close", () => onClose(currentUser));
});
