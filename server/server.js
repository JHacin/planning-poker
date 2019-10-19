import { createServer } from "http";
import { server as WebSocketServer } from "websocket";
import * as actionTypes from "../src/redux/actionTypes";
import { echoUserList, echoSessionList } from "../src/redux/actions";
import { SESSION_ABORTED, SESSION_RUN_AGAIN, SESSION_RUN_AGAIN_FRESH } from "../src/constants";
import UserOps from "./operations/UserOps";
import SessionOps from "./operations/SessionOps";
import ArrayUtil from "../src/util/array";
import SessionStorage from "./storage/SessionStorage";
import UserStorage from "./storage/UserStorage";

const server = new WebSocketServer({
  httpServer: createServer().listen(8000)
});

const clients = {};
let disconnectedUsers = [];

const sendResponse = (response, targetUser = false) => {
  const message = JSON.stringify(response);

  if (targetUser) {
    clients[targetUser].sendUTF(message);
  } else {
    Object.keys(clients).forEach(client => clients[client].sendUTF(message));
  }
};

const sendUsersUpdate = () => {
  sendResponse(echoUserList({ ...UserStorage.getAll() }));
};

const sendSessionsUpdate = (targetUser = false) => {
  sendResponse(echoSessionList({ ...SessionStorage.getAll() }), targetUser);
};

const flagAsDisconnected = id => {
  if (!disconnectedUsers.includes(id)) {
    disconnectedUsers.push(id);
  }
};

const unflagAsDisconnected = id => {
  disconnectedUsers = ArrayUtil.remove(disconnectedUsers, id);
};

const removeIfNotReconnected = id => {
  if (disconnectedUsers.includes(id)) {
    UserOps.remove(id);
    unflagAsDisconnected(id);
    sendUsersUpdate();
    sendSessionsUpdate();
  }
};

const updateSessionStatus = payload => {
  const { id, status } = payload;
  SessionOps.setStatus(id, status);

  switch (status) {
    case SESSION_ABORTED:
      SessionOps.resetStories(id);
      break;
    case SESSION_RUN_AGAIN:
      SessionOps.removeAllParticipants(id);
      SessionOps.resetStories(id);
      break;
    case SESSION_RUN_AGAIN_FRESH:
      SessionOps.removeAllParticipants(id);
      SessionOps.resetStories(id, true);
      break;
    default:
      break;
  }
};

const onMessage = (message, id) => {
  if (message.type === "utf8") {
    const json = JSON.parse(message.utf8Data).message;
    const { type: actionType, payload } = json;

    switch (actionType) {
      case actionTypes.USER_LOGIN:
        UserOps.add(payload);
        sendUsersUpdate();
        sendSessionsUpdate(id);
        break;
      case actionTypes.USER_LOGOUT:
        UserOps.remove(payload.id);
        unflagAsDisconnected(payload.id);
        sendUsersUpdate();
        sendSessionsUpdate();
        break;
      case actionTypes.GENERATE_NEXT_SESSION_ID:
        SessionStorage.setNextId();
        sendSessionsUpdate(id);
        break;
      case actionTypes.ADD_SESSION:
        SessionOps.add(payload);
        sendSessionsUpdate();
        break;
      case actionTypes.REMOVE_SESSION:
        SessionOps.remove(payload.id);
        sendSessionsUpdate();
        break;
      case actionTypes.UPDATE_SESSION_STATUS:
        updateSessionStatus(payload);
        sendSessionsUpdate();
        break;
      case actionTypes.JOIN_SESSION:
        {
          const { session, user } = payload;
          SessionOps.addParticipant(session, user);
          UserOps.setActiveSession(user, session);
          sendUsersUpdate();
          sendSessionsUpdate();
        }
        break;
      case actionTypes.LEAVE_SESSION:
          {
            const { session, user } = payload;
            SessionOps.removeParticipant(session, user);
            UserOps.unsetActiveSession(user);
            sendUsersUpdate();
            sendSessionsUpdate();
          }
          break;
      case actionTypes.PROVIDE_ESTIMATE:
        {
          const { id: sessionId, story, value } = payload;
          SessionOps.addEstimate(sessionId, story, value);
          sendSessionsUpdate();
        }
        break;
      default:
        break;
    }
  }
};

server.on("request", request => {
  const client = request.resourceURL.query.id;
  const connection = request.accept(null, request.origin);
  clients[client] = connection;

  if (disconnectedUsers.includes(client)) {
    unflagAsDisconnected(client);
  }

  connection.on("message", message => onMessage(message, client));
  connection.on("close", () => {
    flagAsDisconnected(client);
    setTimeout(() => removeIfNotReconnected(client), 5000);
  });
});
