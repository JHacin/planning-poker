import { w3cwebsocket as W3CWebSocket } from "websocket";
import { SEND_TO_SERVER, USER_LOGIN, USER_LOGOUT } from "./actionTypes";
import { sendUserLogin } from "./actions";
import { getCurrentUserId, getCurrentUserName, removeCurrentUserSession } from "../util/user";

const webSocketMiddleware = store => {
  let socket;

  const initializeWebsocket = () => {
    socket = new W3CWebSocket(`ws://localhost:8000?id=${getCurrentUserId()}`);

    socket.onopen = () => {
      socket.send(
        JSON.stringify(
          sendUserLogin({
            id: getCurrentUserId(),
            username: getCurrentUserName()
          })
        )
      );
    };

    socket.onmessage = message => {
      store.dispatch(JSON.parse(message.data));
    };
  };

  // Logs user back in when they close and reopen the tab.
  if (!socket && getCurrentUserId()) {
    initializeWebsocket();
  }

  const sendToWebsocket = message => {
    const payload = JSON.stringify(message);

    if (!socket) {
      initializeWebsocket();
    }

    if (socket.readyState !== 1) {
      socket.onopen = () => socket.send(payload);
    } else {
      socket.send(payload);
    }
  };

  const closeSocket = () => {
    if (socket) {
      socket.close();
      socket = null;
    }
  };

  return next => action => {
    if (action.type === SEND_TO_SERVER) {
      switch (action.message.type) {
        case USER_LOGIN:
          sendToWebsocket(action);
          break;
        case USER_LOGOUT:
          sendToWebsocket(action);
          removeCurrentUserSession();
          closeSocket();
          break;
        default:
          sendToWebsocket(action);
          break;
      }
    }

    return next(action);
  };
};

export default webSocketMiddleware;
