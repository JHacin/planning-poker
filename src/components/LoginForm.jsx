import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import generateUuid from "uuid/v1";
import { sendUserLogin } from "../redux/actions";
import {
  getCurrentUserName,
  getCurrentUserUuid,
  setCurrentUserName,
  setCurrentUserUuid
} from "../util/user";

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

  handleLogin = () => {
    const { username } = this.state;
    const { sendUserLogin: sendLoginEventToServer } = this.props;

    if (username !== "") {
      if (!getCurrentUserUuid()) {
        setCurrentUserUuid(generateUuid());
      }
      if (!getCurrentUserName()) {
        setCurrentUserName(username);
      }

      sendLoginEventToServer({ username });
    }

    this.setState({ username: "" });
  };

  render() {
    return (
      <div>
        <input onChange={e => this.handleInputChange(e.target.value)} />
        <button type="button" onClick={this.handleLogin}>
          Login
        </button>
      </div>
    );
  }
}

LoginForm.propTypes = {
  sendUserLogin: PropTypes.func.isRequired
};

export default connect(
  null,
  { sendUserLogin }
)(LoginForm);
