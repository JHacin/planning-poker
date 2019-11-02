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
  if (
    action.type === RECEIVE_FROM_SERVER &&
    action.message.type === USER_LIST_UPDATE
  ) {
    return { ...action.message.payload };
  }

  return state;
};

export default users;
