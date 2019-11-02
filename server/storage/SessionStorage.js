import { sessionListInitialState } from "../../src/redux/reducers/sessions";
import ArrayUtil from "../../src/util/array";

const sessions = { ...sessionListInitialState };

const SessionStorage = {
  getAll: () => sessions,
  getList: () => sessions.idList,
  getById: id => sessions.byId[id],

  setNextId: () => {
    sessions.nextSessionId += 1;
  },

  add: (id, data) => {
    if (!sessions.idList.includes(id)) {
      sessions.idList.push(id);
      sessions.byId[id] = { ...data };
    }
  },

  remove: id => {
    delete sessions.byId[id];
    sessions.idList = ArrayUtil.remove(sessions.idList, id);
  },

  setValue: (id, prop, value) => {
    SessionStorage.getById(id)[prop] = value;
  },

  getValue: (id, prop) => {
    return SessionStorage.getById(id)[prop];
  }
};

export default SessionStorage;
