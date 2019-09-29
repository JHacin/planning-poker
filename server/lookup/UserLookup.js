import UserStorage from "../storage/UserStorage";

const UserLookup = {
  exists: id => {
    return UserStorage.getList().includes(id);
  },

  getActiveSession: id => {
    return UserStorage.getById(id).participantIn;
  }
};

export default UserLookup;
