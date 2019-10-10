import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import generateUniqueId from "uuid/v1";
import { sendUserLogin } from "../../../redux/actions";
import {
  getCurrentUserId,
  isLoggedIn,
  addCurrentUserSession
} from "../../../util/user";
import Login from "./Login";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ""
    };
  }

  handleInputChange = username => {
    this.setState({ username });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { username } = this.state;
    const { sendUserLogin } = this.props;

    addCurrentUserSession(generateUniqueId(), username);
    sendUserLogin({ id: getCurrentUserId(), username });

    this.setState({ username: "" });
  };

  render() {
    return !isLoggedIn() ? (
      <Login handleSubmit={this.handleSubmit} handleInputChange={this.handleInputChange} />
    ) : (
      <Redirect to="/my-sessions" />
    );
  }
}

LoginForm.propTypes = {
  sendUserLogin: PropTypes.func.isRequired
};

export default withRouter(
  connect(
    null,
    { sendUserLogin }
  )(LoginForm)
);
