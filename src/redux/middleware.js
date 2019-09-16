import { w3cwebsocket as W3CWebSocket } from "websocket";
import {
  SEND_TO_SERVER,
  USER_LOGIN,
  USER_LOGOUT,
  USER_RECONNECT
} from "./actionTypes";
import {
  sendUserLogin,
  currentUserLogIn,
  currentUserLogOut,
  sendUserReconnect
} from "./actions";
import {
  getCurrentUserUuid,
  getCurrentUserName,
  removeCurrentUserSession
} from "../util/user";

const webSocketMiddleware = store => {
  let socket;

  const initializeWebsocket = (reconnect = false) => {
    socket = new W3CWebSocket(
      `ws://localhost:8000?uuid=${getCurrentUserUuid()}`
    );

    socket.onopen = () => {
      const func = reconnect ? sendUserReconnect : sendUserLogin;

      socket.send(
        JSON.stringify(
          func({
            uuid: getCurrentUserUuid(),
            username: getCurrentUserName()
          })
        )
      );
    };

    socket.onmessage = message => {
      store.dispatch(JSON.parse(message.data));
    };

    socket.onclose = () => {
      console.log("Terminated WebSocket connection.");
    };
  };

  // Logs user back in when they close and reopen the tab.
  if (!socket && getCurrentUserUuid()) {
    initializeWebsocket(true);
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
        case USER_RECONNECT:
          sendToWebsocket(action);
          store.dispatch(currentUserLogIn());
          break;
        case USER_LOGOUT:
          sendToWebsocket(action);
          store.dispatch(currentUserLogOut());
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
