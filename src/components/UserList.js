import React from "react";
import User from "./User";
import { connect } from "react-redux";

const UserList = ({ users }) => (
	<ul>
		{users && <strong>User list:</strong>}
		{users && users.uuidList.length
			?	users.uuidList.map(uuid => <User key={uuid} user={users.byUuid[uuid]} />)
			: "No users found."
		}
	</ul>
);

const mapStateToProps = state => ({
	users: state.users
});

export default connect(
	mapStateToProps,
	null
)(UserList);
