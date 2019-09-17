import { RECEIVE_FROM_SERVER, USER_LIST_UPDATE } from "../actionTypes";
import { USER_STATUS_DISCONNECTED } from "../../constants";

export const userListInitialState = {
  uuidList: [],
  byUuid: {}
};

export const userInitialState = {
  uuid: "",
  username: "",
  connectionStatus: USER_STATUS_DISCONNECTED,
};

const users = (state = userListInitialState, action) => {
  if (action.type === RECEIVE_FROM_SERVER) {
    switch (action.message.type) {
      case USER_LIST_UPDATE:
        return { ...action.message.payload };
      default:
        return state;
    }
  }

  return state;
};

export default users;
