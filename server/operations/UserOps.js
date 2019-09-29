import { userInitialState } from "../../src/redux/reducers/users";
import UserStorage from "../storage/UserStorage";
import SessionLookup from "../lookup/SessionLookup";
import SessionOps from "./SessionOps";
import UserLookup from "../lookup/UserLookup";

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
    UserOps.removeFromActiveSession(id);
    UserStorage.remove(id);
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
  },

  removeFromActiveSession: id => {
    const moderatedSesson = SessionLookup.getByModerator(id);
    const activeSession = UserLookup.getActiveSession(id);

    if (moderatedSesson) {
      SessionOps.remove(moderatedSesson);
    }

    if (activeSession) {
      SessionOps.removeParticipant(activeSession, id);
    }
  }
};

export default UserOps;
