import React from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getSessionsWithFullData } from "../redux/selectors";
import { getTitle } from "../scaleTypes";

const NoSessionsDisplay = () => {
  return (
    <div>
      <h3>Huh, no sessions available. Create one?</h3>
      <Link to="/my-sessions/add">Create session</Link>
    </div>
  );
};

const SessionList = ({ sessions }) => {
  const { idList, byId } = sessions;

  const ListItems = () =>
    idList.map(id => {
      const { name, scaleType, moderatorName, id: sessionId } = byId[id];

      return (
        <li key={sessionId}>
          <p>
            <a href={`/sessions/${sessionId}`}>
              <strong>Name: </strong>
              {name}
            </a>
          </p>
          <p>
            <strong>Scale type: </strong>
            {getTitle(scaleType)}
          </p>
          <p>
            <strong>Moderated by: </strong>
            {moderatorName}
          </p>
        </li>
      );
    });

  return (
    <ul>
      <ListItems />
    </ul>
  );
};

SessionList.propTypes = {
  sessions: PropTypes.shape({
    idList: PropTypes.arrayOf(PropTypes.number).isRequired,
    byId: PropTypes.objectOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        moderator: PropTypes.string.isRequired,
        scaleType: PropTypes.string.isRequired,
        moderatorName: PropTypes.string.isRequired
      })
    ).isRequired
  }).isRequired
};

const JoinSessions = ({ sessions }) => {
  return !sessions.idList || !sessions.idList.length ? (
    <NoSessionsDisplay />
  ) : (
    <div>
      <h3>Available sessions to join</h3>
      <SessionList sessions={sessions} />
    </div>
  );
};

const mapStateToProps = state => ({
  sessions: getSessionsWithFullData(state)
});

JoinSessions.propTypes = { ...SessionList.propTypes };

export default withRouter(
  connect(
    mapStateToProps,
    null
  )(JoinSessions)
);
