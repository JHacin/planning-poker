import { combineReducers } from "redux";
import users from "./users";
import sessions from "./sessions";
import currentUser from "./currentUser";

export default combineReducers({ users, sessions, currentUser });
