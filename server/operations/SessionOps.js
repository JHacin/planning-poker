import SessionStorage from "../storage/SessionStorage";
import ArrayUtil from "../../src/util/array";
import { sessionInitialState } from "../../src/redux/reducers/sessions";
import { SESSION_WAITING_FOR_PARTICIPANTS, SESSION_PENDING_LAUNCH } from "../../src/constants";
import SessionLookup from "../lookup/SessionLookup";
import { calculateAverage } from "../../src/scaleTypes";
import UserLookup from "../lookup/UserLookup";

const SessionOps = {
  add: payload => {
    const { id } = payload;
    SessionStorage.add(id, {
      ...sessionInitialState,
      ...payload,
      status: SESSION_WAITING_FOR_PARTICIPANTS
    });
  },

  remove: id => {
    SessionStorage.add(id);
  },

  addParticipant: (id, participant) => {
    const alreadyIncluded = SessionLookup.includesParticipant(id, participant);
    const isModerator = SessionLookup.getModerator(id).id === participant;

    if (!alreadyIncluded && !isModerator) {
      SessionStorage.setValue(id, "participants", [
        ...SessionStorage.getValue(id, "participants"),
        participant
      ]);

      if (SessionLookup.getStatus(id) === SESSION_WAITING_FOR_PARTICIPANTS) {
        SessionOps.setStatus(id, SESSION_PENDING_LAUNCH);
      }
    }
  },

  removeParticipant: (id, participant) => {
    if (id && UserLookup.exists(participant)) {
      SessionStorage.setValue(
        id,
        "participants",
        ArrayUtil.remove(SessionStorage.getValue(id, "participants"), participant)
      );

      if (!SessionLookup.hasParticipants(id)) {
        SessionOps.setStatus(id, SESSION_WAITING_FOR_PARTICIPANTS);
      }
    }
  },

  removeAllParticipants: id => {
    SessionStorage.setValue(id, "participants", []);
    SessionOps.setStatus(id, SESSION_WAITING_FOR_PARTICIPANTS);
  },

  setStatus: (id, status) => {
    SessionStorage.setValue(id, "status", status);
  },

  addEstimate: (sessionId, storyId, value) => {
    const userStory = SessionLookup.getStoryById(sessionId, storyId);
    userStory.estimatesGiven.push(value);

    if (SessionLookup.storyIsCompleted(sessionId, storyId)) {
      SessionOps.completeStoryEstimation(sessionId, storyId);
    }
  },

  completeStoryEstimation: (sessionId, storyId) => {
    const session = SessionStorage.getById(sessionId);
    const userStory = SessionLookup.getStoryById(sessionId, storyId);

    userStory.receivedAllEstimates = true;
    userStory.average = calculateAverage(session.scaleType, userStory.estimatesGiven);

    if (SessionLookup.sessionIsCompleted(sessionId)) {
      SessionOps.completeSession(sessionId);
    }
  },

  completeSession: id => {
    SessionOps.setStatus(id, SessionLookup.getStatusOnCompletion(id));
  },

  resetStory: (story, logPreviousEstimates) => {
    return {
      ...story,
      previousEstimates: logPreviousEstimates
        ? [...story.previousEstimates, ...story.estimatesGiven]
        : [],
      estimatesGiven: [],
      average: null,
      receivedAllEstimates: false
    };
  },

  resetStories: (id, logPreviousEstimates) => {
    const currentStories = SessionStorage.getValue(id, "userStories");
    const updatedStories = currentStories.map(story =>
      SessionOps.resetStory(story, logPreviousEstimates)
    );
    SessionStorage.setValue(id, "userStories", updatedStories);
  }
};

export default SessionOps;
