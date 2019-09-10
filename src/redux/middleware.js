import { w3cwebsocket as W3CWebSocket } from "websocket";
import { SEND_TO_SERVER, USER_LOGIN, USER_LOGOUT } from "./actionTypes";
import { sendUserLogin, currentUserLogIn, currentUserLogOut } from "./actions";
import {
  getCurrentUserUuid,
  getCurrentUserName,
  removeCurrentUserSession
} from "../util/user";

const webSocketMiddleware = store => {
  let socket;
  const { isLoggedIn } = store.getState().currentUser;

  const initializeWebsocket = () => {
    socket = new W3CWebSocket(
      `ws://localhost:8000?uuid=${getCurrentUserUuid()}`
    );

    socket.onopen = () => {
      socket.send(
        JSON.stringify(
          sendUserLogin({
            uuid: getCurrentUserUuid(),
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
  if (!isLoggedIn && getCurrentUserUuid()) {
    initializeWebsocket();
  }

  return next => action => {
    if (action.type === SEND_TO_SERVER) {
      switch (action.message.type) {
        case USER_LOGIN:
          initializeWebsocket();
          store.dispatch(currentUserLogIn());
          break;
        case USER_LOGOUT:
          socket.send(JSON.stringify(action));
          store.dispatch(currentUserLogOut());
          removeCurrentUserSession();
          break;
        default:
          socket.send(JSON.stringify(action));
          break;
      }
    }

    return next(action);
  };
};

export default webSocketMiddleware;
