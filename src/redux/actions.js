import {
  SEND_TO_SERVER,
  RECEIVE_FROM_SERVER,
  USER_LOGIN,
  USER_LIST_UPDATE,
  CURRENT_USER_LOG_IN,
  CURRENT_USER_LOG_OUT,
  USER_LOGOUT,
  ADD_SESSION,
  REMOVE_SESSION,
  SESSION_LIST_UPDATE,
  USER_RECONNECT,
  USER_DISCONNECT,
  GENERATE_NEXT_SESSION_ID,
  JOIN_SESSION,
  UPDATE_SESSION_STATUS,
  PROVIDE_ESTIMATE
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

export const sendUserReconnect = userData =>
  sendToServer({
    type: USER_RECONNECT,
    payload: { ...userData }
  });

export const receiveUserDisconnect = uuid =>
  receiveFromServer({
    type: USER_DISCONNECT,
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

export const sendGenerateNextSessionId = () =>
  sendToServer({
    type: GENERATE_NEXT_SESSION_ID
  });

export const sendAddSession = sessionData =>
  sendToServer({
    type: ADD_SESSION,
    payload: { ...sessionData }
  });

export const sendRemoveSession = id =>
  sendToServer({
    type: REMOVE_SESSION,
    payload: { id }
  });

export const receiveSessionListUpdate = sessionList =>
  receiveFromServer({
    type: SESSION_LIST_UPDATE,
    payload: { ...sessionList }
  });

export const joinSession = (sessionId, userId) =>
  sendToServer({
    type: JOIN_SESSION,
    payload: { sessionId, userId }
  });

export const updateSessionStatus = (sessionId, status) =>
  sendToServer({
    type: UPDATE_SESSION_STATUS,
    payload: { sessionId, status }
  });

export const provideEstimate = (sessionId, storyId, estimateValue) =>
  sendToServer({
    type: PROVIDE_ESTIMATE,
    payload: { sessionId, storyId, estimateValue }
  });
