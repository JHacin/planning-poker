import React from "react";
import PropTypes from "prop-types";

const User = ({ user }) => <li>{user.username}</li>;

User.propTypes = {
  user: PropTypes.shape({
    uuid: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired
  }).isRequired
};

export default User;
