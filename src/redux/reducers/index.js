import { combineReducers } from "redux";
import users from "./users";
import sessions from "./sessions";

export default combineReducers({ users, sessions });
