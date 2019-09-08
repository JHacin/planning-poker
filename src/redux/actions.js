import {
  SEND_TO_SERVER,
  RECEIVE_FROM_SERVER,
  USER_LOGIN,
  USER_LIST_UPDATE
} from "./actionTypes";

export const sendUserLogin = userData => ({
  type: SEND_TO_SERVER,
  message: {
    type: USER_LOGIN,
    payload: { ...userData }
  }
});

export const receiveUserListUpdate = userList => ({
  type: RECEIVE_FROM_SERVER,
  message: {
    type: USER_LIST_UPDATE,
    payload: { ...userList }
  }
});
