import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect, withRouter } from "react-router-dom";
import { isLoggedIn } from "../util/user";

const PrivateRoute = ({ component: Component, ...otherProps }) => {
  return (
    <Route
      {...otherProps}
      render={() => (isLoggedIn() ? <Component /> : <Redirect to="/login" />)}
    />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.elementType.isRequired
};

export default withRouter(PrivateRoute);
