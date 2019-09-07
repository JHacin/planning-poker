import React, { Component } from "react";
import { connect } from "react-redux";
import { send_userLogin } from "../redux/actions";
import generateUuid from "uuid/v1";
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

    if (username !== "") {
      if (!getCurrentUserUuid()) {
        setCurrentUserUuid(generateUuid());
      }

      if (!getCurrentUserName()) {
        setCurrentUserName(username);
      }

      this.props.send_userLogin({ username });
    }

    this.setState({ username: "" });
  };

  render() {
    return (
      <div>
        <input onChange={e => this.handleInputChange(e.target.value)} />
        <button onClick={this.handleLogin}>Login</button>
      </div>
    );
  }
}

export default connect(
  null,
  { send_userLogin }
)(LoginForm);
