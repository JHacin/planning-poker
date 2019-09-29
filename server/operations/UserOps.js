import { userInitialState } from "../../src/redux/reducers/users";
import UserStorage from "../storage/UserStorage";
import SessionLookup from "../lookup/SessionLookup";
import SessionOps from "./SessionOps";

const UserOps = {
  add: payload => {
    const { id, username } = payload;
    UserStorage.add(id, {
      ...userInitialState,
      id,
      username
    });
  },

  remove: id => {
    UserStorage.remove(id);

    SessionLookup.getByModerator(id).forEach(session => {
      SessionOps.remove(session);
    });
  },

  setActiveSession: (id, session) => {
    if (SessionLookup.getModerator(session) === id) {
      UserStorage.setValue(id, "moderatorOf", session);
    } else {
      UserStorage.setValue(id, "participantIn", session);
    }
  },

  setModeratedSession: (id, session) => {
    UserStorage.setValue(id, "moderatorOf", session);
  }
};

export default UserOps;
