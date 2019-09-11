import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import generateUuid from "uuid/v1";
import { sendUserLogin } from "../redux/actions";
import { setCurrentUserName, setCurrentUserUuid } from "../util/user";

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

  handleSubmit = e => {
    const { username } = this.state;
    const { sendUserLogin } = this.props;

    e.preventDefault();
    setCurrentUserUuid(generateUuid());
    setCurrentUserName(username);
    sendUserLogin({ username });
    this.setState({ username: "" });
  };

  render() {
    const { currentUser } = this.props;

    return !currentUser.isLoggedIn ? (
      <div>
        <h1>Planning Poker</h1>
        <form onSubmit={e => this.handleSubmit(e)}>
          <input
            required
            onChange={e => this.handleInputChange(e.target.value)}
          />
          <input type="submit" value="Login" />
        </form>
      </div>
    ) : (
      <Redirect to="/my-sessions" />
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.currentUser
});

LoginForm.propTypes = {
  sendUserLogin: PropTypes.func.isRequired,
  currentUser: PropTypes.shape({
    isLoggedIn: PropTypes.bool.isRequired
  }).isRequired
};

export default withRouter(
  connect(
    mapStateToProps,
    { sendUserLogin }
  )(LoginForm)
);
