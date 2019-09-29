import { userListInitialState } from "../../src/redux/reducers/users";
import ArrayUtil from "../util/array";

const users = { ...userListInitialState };

const UserStorage = {
  getAll: () => users,
  getList: () => users.idList,
  getEntities: () => users.byId,
  getById: id => users.byId[id],

  add: (id, data) => {
    if (!users.idList.includes(id)) {
      users.idList.push(id);
      users.byId[id] = { ...data };
    }
  },

  remove: id => {
    if (users.idList.includes(id)) {
      delete users.byId[id];
      users.idList = ArrayUtil.remove(users.idList, id);
    }
  },

  setValue: (id, prop, value) => {
    UserStorage.getById(id)[prop] = value;
  },

  getValue: (id, prop) => {
    return UserStorage.getById(id)[prop];
  }
};

export default UserStorage;
