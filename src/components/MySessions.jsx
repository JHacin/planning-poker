import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getSessionsCreatedByUser } from "../redux/selectors";
import { getCurrentUserUuid } from "../util/user";

const NoSessionsDisplay = () => {
  return (
    <div>
      <h3>You do not have any sessions yet. Create one now?</h3>
      <Link to="/my-sessions/add">Create session</Link>
    </div>
  );
};

const mapStateToProps = state => ({
  mySessions: getSessionsCreatedByUser(state, getCurrentUserUuid())
});

const MySessions = ({ mySessions }) => {
  return (
    <div>
      <h2>My Sessions</h2>
      {mySessions.length ? (
        <div>
          {mySessions.map(session => (
            <div key={session.id}>{session.name}</div>
          ))}
        </div>
      ) : (
        <NoSessionsDisplay />
      )}
    </div>
  );
};

MySessions.propTypes = {
  mySessions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      owner: PropTypes.string.isRequired,
      userStories: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          text: PropTypes.string.isRequired
        })
      )
    })
  ).isRequired
};

export default connect(
  mapStateToProps,
  null
)(MySessions);
