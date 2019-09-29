import * as types from "./actionTypes";

const sendToServer = message => ({
  type: types.SEND_TO_SERVER,
  message
});

const receiveFromServer = message => ({
  type: types.RECEIVE_FROM_SERVER,
  message
});

export const sendUserLogin = data =>
  sendToServer({
    type: types.USER_LOGIN,
    payload: { ...data }
  });

export const sendUserLogout = id =>
  sendToServer({
    type: types.USER_LOGOUT,
    payload: { id }
  });

export const echoUserList = list =>
  receiveFromServer({
    type: types.USER_LIST_UPDATE,
    payload: { ...list }
  });

export const sendGenerateNextSessionId = () =>
  sendToServer({
    type: types.GENERATE_NEXT_SESSION_ID
  });

export const sendAddSession = data =>
  sendToServer({
    type: types.ADD_SESSION,
    payload: { ...data }
  });

export const sendRemoveSession = id =>
  sendToServer({
    type: types.REMOVE_SESSION,
    payload: { id }
  });

export const echoSessionList = list =>
  receiveFromServer({
    type: types.SESSION_LIST_UPDATE,
    payload: { ...list }
  });

export const joinSession = (session, user) =>
  sendToServer({
    type: types.JOIN_SESSION,
    payload: { session, user }
  });

export const updateSessionStatus = (id, status) =>
  sendToServer({
    type: types.UPDATE_SESSION_STATUS,
    payload: { id, status }
  });

export const provideEstimate = (id, story, value) =>
  sendToServer({
    type: types.PROVIDE_ESTIMATE,
    payload: { id, story, value }
  });
