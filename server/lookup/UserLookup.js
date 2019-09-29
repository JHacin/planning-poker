import UserStorage from "../storage/UserStorage";

const UserLookup = {
  exists: id => {
    return UserStorage.getList().includes(id);
  },

  getActiveSession: id => {
    const user = UserStorage.getById(id);
    return user && user.participantIn;
  }
};

export default UserLookup;
