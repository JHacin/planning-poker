import { sessionListInitialState } from "./reducers/sessions";

export const sessionsExist = state => state.sessions.idList.length;

export const getSessionById = (state, sessionId) => {
  return sessionsExist(state) && state.sessions.byId[sessionId]
    ? state.sessions.byId[sessionId]
    : {};
};

export const getSessionsCreatedByUser = (state, userId) => {
  return sessionsExist(state)
    ? state.sessions.idList
        .filter(id => getSessionById(state, id).moderator === userId)
        .map(sessionId => getSessionById(state, sessionId))
    : [];
};

export const getUserNameById = (state, userId) => {
  return state.users.uuidList.includes(userId)
    ? state.users.byUuid[userId].username
    : "";
};

export const getSessionModerator = (state, sessionId) => {
  return sessionsExist(state) &&
    Object.prototype.hasOwnProperty.call(
      getSessionById(state, sessionId),
      "moderator"
    )
    ? getSessionById(state, sessionId).moderator
    : false;
};

export const getSessionsWithFullData = state => {
  if (sessionsExist(state)) {
    const sessions = { ...state.sessions };
    state.sessions.idList.forEach(id => {
      sessions.byId[id].moderatorName = getUserNameById(
        state,
        getSessionModerator(state, id)
      );
    });
    return sessions;
  }

  return { ...sessionListInitialState };
};
