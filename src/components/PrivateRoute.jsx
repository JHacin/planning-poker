import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect, withRouter } from "react-router-dom";
import { getCurrentUserUuid } from "../util/user";

const PrivateRoute = ({ component: Component, ...otherProps }) => {
  const isLoggedIn = getCurrentUserUuid();

  return (
    <Route
      {...otherProps}
      render={() => (isLoggedIn ? <Component /> : <Redirect to="/login" />)}
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.elementType.isRequired
};

export default withRouter(PrivateRoute);
