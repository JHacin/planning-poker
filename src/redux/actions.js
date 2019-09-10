import {
  SEND_TO_SERVER,
  RECEIVE_FROM_SERVER,
  USER_LOGIN,
  USER_LIST_UPDATE,
  CURRENT_USER_LOG_IN,
  CURRENT_USER_LOG_OUT,
  USER_LOGOUT
} from "./actionTypes";

const sendToServer = message => ({
  type: SEND_TO_SERVER,
  message
});

const receiveFromServer = message => ({
  type: RECEIVE_FROM_SERVER,
  message
});

export const sendUserLogin = userData =>
  sendToServer({
    type: USER_LOGIN,
    payload: { ...userData }
  });

export const sendUserLogout = uuid =>
  sendToServer({
    type: USER_LOGOUT,
    payload: { uuid }
  });

export const receiveUserListUpdate = userList =>
  receiveFromServer({
    type: USER_LIST_UPDATE,
    payload: { ...userList }
  });

export const currentUserLogIn = () => ({
  type: CURRENT_USER_LOG_IN
});

export const currentUserLogOut = () => ({
  type: CURRENT_USER_LOG_OUT
});
