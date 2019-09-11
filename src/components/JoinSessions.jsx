import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const NoSessionsDisplay = () => {
  return (
    <div>
      <h3>Huh, no sessions available. Create one?</h3>
      <Link to="/my-sessions/add">Create session</Link>
    </div>
  );
};

const JoinSessions = ({ sessions }) => {
  const { idList } = sessions;

  if (!idList.length) {
    return <NoSessionsDisplay />;
  }

  return (
    <div>
      <h2>Join Sessions</h2>
    </div>
  );
};

const mapStateToProps = state => ({
  sessions: state.sessions
});

JoinSessions.propTypes = {
  sessions: PropTypes.shape({
    idList: PropTypes.arrayOf(PropTypes.string).isRequired,
    byId: PropTypes.objectOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired
      })
    ).isRequired
  }).isRequired
};

export default connect(
  mapStateToProps,
  null
)(JoinSessions);
