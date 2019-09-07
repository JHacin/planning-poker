import {
	SEND_TO_SERVER,
	RECEIVE_FROM_SERVER,
  USER_LOGIN,
	USER_LIST_UPDATE
} from "./actionTypes";

export const send_userLogin = userData => ({
  type: SEND_TO_SERVER,
  message: {
		type: USER_LOGIN,
		payload: { ...userData }
  }
});

export const receive_userListUpdate = userList => ({
	type: RECEIVE_FROM_SERVER,
  message: {
		type: USER_LIST_UPDATE,
		payload: { ...userList }
  }
});