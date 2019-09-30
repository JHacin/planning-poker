import React from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getSessionsCreatedByUser } from "../redux/selectors";
import { getCurrentUserId } from "../util/user";
import { getTitle } from "../scaleTypes";

const NoSessionsDisplay = () => {
  return (
    <div>
      <h3>You do not have any sessions yet. Create one now?</h3>
      <Link to="/my-sessions/add">Create session</Link>
    </div>
  );
};

const SessionList = ({ mySessions }) => {
  const ListItems = () => {
    return mySessions.map(session => {
      const { id, name, scaleType } = session;
      return (
        <div key={id}>
          <a href={`sessions/${id}`}>{name}</a>
          {" | "}
          <span>{getTitle(scaleType)}</span>
          {" | "}
          <span>Status goes here</span>
        </div>
      );
    });
  };

  return (
    <div>
      <ListItems />
    </div>
  );
};

const MySessions = ({ mySessions }) => {
  return (
    <div>
      <h2>My Sessions</h2>
      {mySessions.length ? <SessionList mySessions={mySessions} /> : <NoSessionsDisplay />}
    </div>
  );
};

SessionList.propTypes = {
  mySessions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      moderator: PropTypes.shape({
        id: PropTypes.number.isRequired,
        username: PropTypes.string.isRequired
      }).isRequired,
      userStories: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          text: PropTypes.string.isRequired
        })
      )
    })
  ).isRequired
};

MySessions.propTypes = { ...SessionList.propTypes };

const mapStateToProps = state => ({
  mySessions: getSessionsCreatedByUser(state, getCurrentUserId())
});

export default withRouter(
  connect(
    mapStateToProps,
    null
  )(MySessions)
);
