import SessionStorage from "../storage/SessionStorage";
import {
  ESTIMATE_NOT_GIVEN,
  SESSION_COMPLETED_WITH_MISSING_ESTIMATES,
  ESTIMATE_IS_UNDOABLE,
  SESSION_COMPLETED_WITH_UNDOABLE,
  ESTIMATE_NEEDS_MORE_INFO,
  SESSION_COMPLETED_NEED_MORE_INFO
} from "../../src/constants";

const SessionLookup = {
  exists: id => {
    return SessionStorage.getList().includes(id);
  },

  hasParticipants: id => {
    return SessionStorage.getById(id).participants.length > 0;
  },

  includesParticipant: (id, participant) => {
    return SessionStorage.getById(id).participants.includes(participant);
  },

  getByModerator: moderator => {
    return SessionStorage.getList().filter(
      session => SessionStorage.getById(session).moderator === moderator
    );
  },

  getModerator: id => {
    return SessionStorage.getById(id).moderator;
  },

  getStatus: id => {
    return SessionStorage.getById(id).status;
  },

  getStoryById: (sessionId, storyId) => {
    return SessionStorage.getById(sessionId).userStories.find(story => story.id === storyId);
  },

  storyIsCompleted: (sessionId, storyId) => {
    const session = SessionStorage.getById(sessionId);
    const story = SessionLookup.getStoryById(sessionId, storyId);
    return session.participants.length === story.estimatesGiven.length;
  },

  sessionIsCompleted: sessionId => {
    return SessionStorage.getById(sessionId).userStories.every(story => story.receivedAllEstimates);
  },

  getStatusOnCompletion: id => {
    const session = SessionStorage.getById(id);
    const averages = session.userStories.map(story => story.average);

    if (averages.includes(ESTIMATE_NOT_GIVEN)) {
      return SESSION_COMPLETED_WITH_MISSING_ESTIMATES;
    }

    if (averages.includes(ESTIMATE_IS_UNDOABLE)) {
      return SESSION_COMPLETED_WITH_UNDOABLE;
    }

    if (averages.includes(ESTIMATE_NEEDS_MORE_INFO)) {
      return SESSION_COMPLETED_NEED_MORE_INFO;
    }
  }
};

export default SessionLookup;
