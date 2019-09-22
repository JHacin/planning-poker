import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  SESSION_STATUS_WAITING_FOR_PARTICIPANTS,
  SESSION_STATUS_INITIALIZING,
  SESSION_STATUS_PENDING_LAUNCH,
  SESSION_STATUS_IN_PROGRESS
} from "../constants";
import { joinSession, updateSessionStatus } from "../redux/actions";
import { getCurrentUserUuid } from "../util/user";
import { getUserNameById } from "../redux/selectors";

class Session extends Component {
  componentDidMount() {
    const {
      joinSession,
      match: {
        params: { id: sessionId }
      }
    } = this.props;

    joinSession(sessionId, getCurrentUserUuid());
  }

  startSession = () => {
    const {
      updateSessionStatus,
      session: { id }
    } = this.props;

    updateSessionStatus(id, SESSION_STATUS_IN_PROGRESS);
  };

  renderBasedOnStatus = () => {
    const {
      session: { status, participants }
    } = this.props;

    switch (status) {
      case SESSION_STATUS_INITIALIZING:
        return <h3>Initializing...</h3>;
      case SESSION_STATUS_WAITING_FOR_PARTICIPANTS:
        return <h3>Waiting for participants to join...</h3>;
      case SESSION_STATUS_PENDING_LAUNCH:
        return this.currentUserIsModerator() ? (
          <div>
            <ul>
              {participants.map(participant => (
                <li key={participant}>{participant}</li>
              ))}
            </ul>
            <button type="submit" onClick={this.startSession}>
              Go
            </button>
            <p>
              You can wait for more participants or start. The session will
              become unavailable to join during the process.
            </p>
          </div>
        ) : (
          <div>Waiting to start...</div>
        );
      case SESSION_STATUS_IN_PROGRESS:
        return <div>Session in progress...</div>;
      default:
        return <div>Could not fetch status for this session.</div>;
    }
  };

  currentUserIsModerator = () => {
    const {
      session: { moderator }
    } = this.props;

    return moderator === getCurrentUserUuid();
  };

  render() {
    const { session } = this.props;

    if (!session) {
      return (
        <div>
          <span>Loading...</span>
        </div>
      );
    }

    const { name } = session;

    return (
      <div>
        <h1>{name}</h1>
        <span>
          {this.currentUserIsModerator()
            ? "You are the moderator of this session."
            : "You are a participant in this session."}
        </span>
        {this.renderBasedOnStatus()}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const session = state.sessions.byId[ownProps.match.params.id];

  if (session) {
    const participants = session.participants.map(uuid =>
      getUserNameById(state, uuid)
    );
    session.participants = participants;
  }

  return { session };
};

Session.propTypes = {
  joinSession: PropTypes.func.isRequired,
  updateSessionStatus: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  session: PropTypes.shape({
    id: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    scaleType: PropTypes.string.isRequired,
    userStories: PropTypes.array.isRequired,
    moderator: PropTypes.string.isRequired,
    participants: PropTypes.arrayOf(PropTypes.string)
  })
};

Session.defaultProps = {
  session: undefined
};

export default withRouter(
  connect(
    mapStateToProps,
    { joinSession, updateSessionStatus }
  )(Session)
);
