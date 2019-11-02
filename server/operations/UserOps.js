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
    if (SessionLookup.getModerator(session).id === id) {
      UserStorage.setValue(id, "moderatorOf", session);
    } else {
      UserStorage.setValue(id, "participantIn", session);
    }
  },

  unsetActiveSession: id => {
    UserStorage.setValue(id, "participantIn", userInitialState.participantIn);
  },

  removeFromActiveSession: id => {
    const moderatedSession = SessionLookup.getByModerator(id);
    const activeSession = UserLookup.getActiveSession(id);

    if (moderatedSession) {
      SessionOps.remove(moderatedSession);
    }

    if (activeSession) {
      SessionOps.removeParticipant(activeSession, id);
    }
  }
};

export default UserOps;
