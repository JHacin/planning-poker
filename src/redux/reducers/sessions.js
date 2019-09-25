import { RECEIVE_FROM_SERVER, SESSION_LIST_UPDATE } from "../actionTypes";
import { SCALE_FIBONACCI, SESSION_INITIALIZING } from "../../constants";

export const sessionListInitialState = {
  idList: [],
  byId: {},
  nextSessionId: 0
};

export const sessionInitialState = {
  id: 0,
  name: "",
  status: SESSION_INITIALIZING,
  moderator: "",
  userStories: [],
  participants: [],
  scaleType: SCALE_FIBONACCI
};

export const userStoryInitialState = {
  id: 0,
  text: "",
  estimatesGiven: [],
  average: null,
  receivedAllEstimates: false
};

const sessions = (state = sessionListInitialState, action) => {
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
