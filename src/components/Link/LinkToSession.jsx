import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const LinkToSession = ({ session }) => {
  const { id, name } = session;
  return <Link to={`/sessions/${id}`}>{name}</Link>;
};

LinkToSession.propTypes = {
  session: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired
};

export default LinkToSession;
