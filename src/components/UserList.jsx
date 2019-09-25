import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import User from "./User";

const UserList = ({ users }) => (
  <ul>
    {users && <strong>User list:</strong>}
    {users && users.idList.length
      ? users.idList.map(id => <User key={id} user={users.byId[id]} />)
      : "No users found."}
  </ul>
);

const mapStateToProps = state => ({
  users: state.users
});

UserList.propTypes = {
  users: PropTypes.shape({
    idList: PropTypes.arrayOf(PropTypes.string).isRequired,
    byId: PropTypes.objectOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired
      })
    ).isRequired
  }).isRequired
};

export default connect(
  mapStateToProps,
  null
)(UserList);
