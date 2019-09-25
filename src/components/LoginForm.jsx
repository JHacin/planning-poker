import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import generateUniqueId from "uuid/v1";
import { sendUserLogin } from "../redux/actions";
import { setCurrentUserName, setCurrentUserId, getCurrentUserId, isLoggedIn } from "../util/user";

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

    setCurrentUserId(generateUniqueId());
    setCurrentUserName(username);
    sendUserLogin({ id: getCurrentUserId(), username });

    this.setState({ username: "" });
  };

  render() {
    return !isLoggedIn() ? (
      <div>
        <h1>Planning Poker</h1>
        <form onSubmit={e => this.handleSubmit(e)}>
          <input required onChange={e => this.handleInputChange(e.target.value)} />
          <input type="submit" value="Login" />
        </form>
      </div>
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
