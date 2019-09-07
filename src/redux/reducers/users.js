import { RECEIVE_FROM_SERVER, USER_LIST_UPDATE } from "../actionTypes";

export const initialState = {
	uuidList: [],
	byUuid: {}
};

const users = (state = initialState, action) => {
	if (action.type === RECEIVE_FROM_SERVER) {
		switch (action.message.type) {
			case USER_LIST_UPDATE:
				return { ...action.message.payload };
			default:
				return state;
		}
	}

	return state;
};

export default users;