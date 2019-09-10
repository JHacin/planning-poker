import React, { Component } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { sendUserLogout } from "../redux/actions";

class LogoutRoute extends Component {
  componentDidMount() {
    const { sendUserLogout } = this.props;
    sendUserLogout();
  }

  render() {
    return <Redirect to="/" />;
  }
}

LogoutRoute.propTypes = {
  sendUserLogout: PropTypes.func.isRequired
};

export default connect(
  null,
  { sendUserLogout }
)(LogoutRoute);
