export const sessionsExist = state => state.sessions.idList.length;


export const getSessionById = (state, sessionId) => {
  return sessionsExist(state) && state.sessions.byId[sessionId]
    ? state.sessions.byId[sessionId]
    : {};
};

export const getSessionsCreatedByUser = (state, userId) => {
  return sessionsExist(state)
    ? state.sessions.idList
        .filter(id => getSessionById(state, id).owner === userId)
        .map(sessionId => getSessionById(state, sessionId))
    : [];
};
