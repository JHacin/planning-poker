import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import SessionsAvailable from "./SessionsAvailable";
import NoSessionsAvailable from "./NoSessionsAvailable";

const JoinSessions = ({ sessions }) => {
  const { idList } = sessions;

  return !idList || !idList.length ? (
    <NoSessionsAvailable />
  ) : (
    <SessionsAvailable sessions={sessions} />
  );
};

const mapStateToProps = state => ({
  sessions: state.sessions
});

JoinSessions.propTypes = {
  sessions: PropTypes.shape({
    idList: PropTypes.arrayOf(PropTypes.number).isRequired
  }).isRequired
};

JoinSessions.defaulProps = {
  sessions: {
    idList: []
  }
};

export default withRouter(
  connect(
    mapStateToProps,
    null
  )(JoinSessions)
);
