import { createServer } from "http";
import { server as webSocketServer } from "websocket";
import { USER_LOGIN } from "../src/redux/actionTypes";
import { receive_userListUpdate } from "../src/redux/actions";
import { initialState as usersInitialState } from "../src/redux/reducers/users";

const server = new webSocketServer({
	httpServer: createServer().listen(8000)
});

const clients = {};
const users = usersInitialState;

const onMessage = (message, uuid) => {
	if (message.type === "utf8") {
		const parsedMessage = JSON.parse(message.utf8Data).message;
		const actionType = parsedMessage.type;

		switch (actionType) {
			case USER_LOGIN:
				addUser(uuid, parsedMessage);
				break;
			default:
				break;
		}
	}
};

const onClose = currentUser => {
	removeUser(currentUser);
	sendResponse(receive_userListUpdate(users));
};

const addUser = (uuid, parsedMessage) => {
	if (!users.uuidList.includes(uuid)) {
		users.uuidList.push(uuid);
		users.byUuid = {
			...users.byUuid,
			[uuid]: {
				uuid,
				username: parsedMessage.payload.username
			}
		}
		sendResponse(receive_userListUpdate(users));
	}
};

const removeUser = uuid => {
	delete clients[uuid];
	delete users.byUuid[uuid];
	users.uuidList = [...users.uuidList.filter(current => current !== uuid)]
};

const sendResponse = response => {
	response = JSON.stringify(response);
	Object.keys(clients).forEach(client => clients[client].sendUTF(response));
};	

server.on("request", request => {
	const currentUser = request.resourceURL.query.uuid;
	const connection = request.accept(null, request.origin);
	clients[currentUser] = connection;

	connection.on("message", message => onMessage(message, currentUser));
	connection.on("close", () => onClose(currentUser))
});
