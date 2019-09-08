import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import User from "./User";

const UserList = ({ users }) => (
  <ul>
    {users && <strong>User list:</strong>}
    {users && users.uuidList.length
      ? users.uuidList.map(uuid => (
          <User key={uuid} user={users.byUuid[uuid]} />
        ))
      : "No users found."}
  </ul>
);

const mapStateToProps = state => ({
  users: state.users
});

UserList.propTypes = {
  users: PropTypes.shape({
    uuidList: PropTypes.arrayOf(PropTypes.string).isRequired,
    byUuid: PropTypes.objectOf(
      PropTypes.shape({
        uuid: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired
      })
    ).isRequired
  }).isRequired
};

export default connect(
  mapStateToProps,
  null
)(UserList);
