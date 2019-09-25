import { RECEIVE_FROM_SERVER, USER_LIST_UPDATE } from "../actionTypes";

export const userListInitialState = {
  idList: [],
  byId: {}
};

export const userInitialState = {
  id: "",
  username: "",
  moderatorOf: null,
  participantIn: null
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
