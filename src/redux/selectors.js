import { initialState as sessionsInitialState } from "./reducers/sessions";

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

export const getUserNameById = (state, userId) => {
  return state.users.uuidList.includes(userId)
    ? state.users.byUuid[userId].username
    : "";
};

export const getSessionOwner = (state, sessionId) => {
  return sessionsExist(state) &&
    Object.prototype.hasOwnProperty.call(
      getSessionById(state, sessionId),
      "owner"
    )
    ? getSessionById(state, sessionId).owner
    : false;
};

export const getSessionsWithFullData = state => {
  if (sessionsExist(state)) {
    const sessions = { ...state.sessions };
    state.sessions.idList.forEach(id => {
      sessions.byId[id].ownerName = getUserNameById(
        state,
        getSessionOwner(state, id)
      );
    });
    return sessions;
  }

  return { ...sessionsInitialState };
};
