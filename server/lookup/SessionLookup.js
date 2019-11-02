import SessionStorage from "../storage/SessionStorage";
import { SESSION_COMPLETED } from "../../src/constants";
import { evaluateEstimates } from "../../src/util/session";

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

  getModerator: id => {
    return SessionStorage.getById(id).moderator;
  },

  getByModerator: id => {
    return SessionStorage.getList().find(
      session => SessionLookup.getModerator(session).id === id
    );
  },

  getStoryById: (sessionId, storyId) => {
    return SessionStorage.getById(sessionId).userStories.find(
      story => story.id === storyId
    );
  },

  storyIsCompleted: (sessionId, storyId) => {
    const session = SessionStorage.getById(sessionId);
    const story = SessionLookup.getStoryById(sessionId, storyId);
    return session.participants.length === story.estimatesGiven.length;
  },

  sessionIsCompleted: sessionId => {
    return SessionStorage.getById(sessionId).userStories.every(
      story => story.receivedAllEstimates
    );
  },

  getStatusOnCompletion: id => {
    const session = SessionStorage.getById(id);
    const averages = session.userStories.map(story => story.average);
    const unsatisfactoryStatus = evaluateEstimates(averages);
    return unsatisfactoryStatus || SESSION_COMPLETED;
  }
};

export default SessionLookup;
