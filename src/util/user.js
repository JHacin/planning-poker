import { LOCAL_STORAGE_USER_UUID, LOCAL_STORAGE_USER_NAME } from "../constants";

export const getCurrentUserUuid = () =>
  localStorage.getItem(LOCAL_STORAGE_USER_UUID);

export const setCurrentUserUuid = uuid => {
  if (!getCurrentUserUuid()) {
    localStorage.setItem(LOCAL_STORAGE_USER_UUID, uuid);
  }
};

export const getCurrentUserName = () =>
  localStorage.getItem(LOCAL_STORAGE_USER_NAME);

export const setCurrentUserName = username => {
  if (!getCurrentUserName()) {
    localStorage.setItem(LOCAL_STORAGE_USER_NAME, username);
  }
};
