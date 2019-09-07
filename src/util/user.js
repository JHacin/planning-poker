import { LOCAL_STORAGE_USER_UUID, LOCAL_STORAGE_USER_NAME } from "../constants";

export const setCurrentUserUuid = uuid =>
	localStorage.setItem(LOCAL_STORAGE_USER_UUID, uuid);

export const getCurrentUserUuid = () =>
	localStorage.getItem(LOCAL_STORAGE_USER_UUID);

export const setCurrentUserName = username =>
	localStorage.setItem(LOCAL_STORAGE_USER_NAME, username);

export const getCurrentUserName = () =>
	localStorage.getItem(LOCAL_STORAGE_USER_NAME);
