import { CURRENT_USER_LOG_IN, CURRENT_USER_LOG_OUT } from "../actionTypes";
import { getCurrentUserUuid } from "../../util/user";

export const initialState = {
  isLoggedIn: getCurrentUserUuid() !== null
};

const currentUser = (state = initialState, action) => {
  switch (action.type) {
    case CURRENT_USER_LOG_IN:
      return { isLoggedIn: true };
    case CURRENT_USER_LOG_OUT:
      return { isLoggedIn: false };
    default:
      return state;
  }
};

export default currentUser;
