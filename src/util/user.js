import { LOCAL_STORAGE_USER_ID, LOCAL_STORAGE_USER_NAME } from "../constants";

export const getCurrentUserId = () => localStorage.getItem(LOCAL_STORAGE_USER_ID);

export const isLoggedIn = () => getCurrentUserId() !== null;

export const setCurrentUserId = id => {
  if (!isLoggedIn()) {
    localStorage.setItem(LOCAL_STORAGE_USER_ID, id);
  }
};

export const getCurrentUserName = () => localStorage.getItem(LOCAL_STORAGE_USER_NAME);

export const setCurrentUserName = username => {
  if (getCurrentUserName() === null) {
    localStorage.setItem(LOCAL_STORAGE_USER_NAME, username);
  }
};

export const removeCurrentUserSession = () => {
  localStorage.removeItem(LOCAL_STORAGE_USER_ID);
  localStorage.removeItem(LOCAL_STORAGE_USER_NAME);
};
