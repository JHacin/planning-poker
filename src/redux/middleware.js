import { w3cwebsocket as W3CWebSocket } from "websocket";
import { SEND_TO_SERVER, USER_LOGIN } from "./actionTypes";
import { send_userLogin } from "./actions";
import { getCurrentUserUuid, getCurrentUserName } from "../util/user";

export const webSocketMiddleware = store => {
  let socket;

  const initializeWebsocket = () => {
    socket = new W3CWebSocket(
      `ws://localhost:8000?uuid=${getCurrentUserUuid()}`
    );

    socket.onopen = () => {
      socket.send(JSON.stringify(send_userLogin({
        uuid: getCurrentUserUuid(),
        username: getCurrentUserName()
			})));
    };

    socket.onmessage = message => {
      store.dispatch(JSON.parse(message.data));
    };
  };

  if (getCurrentUserUuid()) {
    initializeWebsocket();
  }

  return next => action => {
    if (action.type === SEND_TO_SERVER) {
      switch (action.message.type) {
        case USER_LOGIN:
          initializeWebsocket();
          break;
        default:
          break;
      }
    }

    return next(action);
  };
};
