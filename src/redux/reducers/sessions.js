import { RECEIVE_FROM_SERVER, SESSION_LIST_UPDATE } from "../actionTypes";

export const initialState = {
  idList: [],
  byId: {}
};

const sessions = (state = initialState, action) => {
  if (action.type === RECEIVE_FROM_SERVER) {
    switch (action.message.type) {
      case SESSION_LIST_UPDATE:
        return { ...action.message.payload };
      default:
        return state;
    }
  }

  return state;
};

export default sessions;
