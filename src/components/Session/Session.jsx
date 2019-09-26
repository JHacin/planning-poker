import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  SESSION_WAITING_FOR_PARTICIPANTS,
  SESSION_INITIALIZING,
  SESSION_PENDING_LAUNCH,
  SESSION_IN_PROGRESS,
  SESSION_FINISHED,
  SESSION_ABORTED,
  ESTIMATE_TIME_LIMIT,
  ESTIMATE_NOT_GIVEN,
  SESSION_COMPLETED,
  SESSION_RUN_AGAIN,
  SESSION_RUN_AGAIN_FRESH
} from "../../constants";
import { joinSession, updateSessionStatus, provideEstimate } from "../../redux/actions";
import { getCurrentUserId } from "../../util/user";
import { getUserNameById } from "../../redux/selectors";
import { getOptionsForType } from "../../scaleTypes";
import InProgressForUser from "./Views/InProgressForUser";
import PendingForModerator from "./Views/PendingForModerator";
import PendingForUser from "./Views/PendingForUser";
import AbortedForUser from "./Views/AbortedForUser";
import AbortedForModerator from "./Views/AbortedForModerator";
import InProgressForModerator from "./Views/InProgressForModerator";
import FinishedForModerator from "./Views/FinishedForModerator";
import FinishedForUser from "./Views/FinishedForUser";
import SessionError from "./Views/SessionError";
import SessionInitializing from "./Views/SessionInitializing";
import SessionWaitingForParticipants from "./Views/SessionWaitingForParticipants";
import UserGaveAllEstimates from "./Views/UserGaveAllEstimates";
import CompletedForModerator from "./Views/CompletedForModerator";

class Session extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionStarted: false,
      isFinished: false,
      currentStory: null,
      currentTimeLeft: ESTIMATE_TIME_LIMIT,
      remainingStories: [],
      estimatingOptions: []
    };
  }

  static getDerivedStateFromProps(props, state) {
    const { session } = props;

    // Session is about to start.
    if (!state.sessionStarted && session) {
      const userStories = [...session.userStories];
      return {
        sessionStarted: true,
        currentStory: userStories.shift(),
        remainingStories: userStories,
        currentTimeLeft: ESTIMATE_TIME_LIMIT,
        estimatingOptions: getOptionsForType(session.scaleType)
      };
    }

    // Session is already active and we are updating its status via server.
    if (state.sessionStarted) {
      switch (session.status) {
        case SESSION_FINISHED:
          return { isFinished: true };
        case SESSION_ABORTED:
          return {
            sessionStarted: false,
            currentStory: null,
            remainingStories: session.userStories,
            currentTimeLeft: ESTIMATE_TIME_LIMIT
          };
        default:
          return state;
      }
    }

    return state;
  }

  componentDidMount() {
    const {
      joinSession,
      match: {
        params: { id }
      }
    } = this.props;

    joinSession(id, getCurrentUserId());
  }

  componentDidUpdate(prevProps, prevState) {
    const { currentStory, currentTimeLeft, isFinished, sessionStarted } = this.state;

    if (!this.currentUserIsModerator()) {
      // Session has just begun.
      if (!prevState.sessionStarted) {
        this.startTimer();
      }

      // Session is in progress.
      if (sessionStarted && !isFinished) {
        // User has provided all estimates.
        if (!currentStory) {
          this.finishForCurrentUser();
        }

        // User's time on the current story has run out.
        if (!currentTimeLeft) {
          this.sendEstimate(currentStory.id, ESTIMATE_NOT_GIVEN);
        }
      } else {
        this.clearTimer();
      }
    }
  }

  startTimer = () => {
    this.timer = setInterval(
      () =>
        this.setState(prevState => ({
          currentTimeLeft: prevState.currentTimeLeft - 1
        })),
      1000
    );
  };

  clearTimer = () => {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = false;
    }
  };

  startSession = () => {
    const {
      updateSessionStatus,
      session: { id }
    } = this.props;

    updateSessionStatus(id, SESSION_IN_PROGRESS);
  };

  finishSession = () => {
    const {
      updateSessionStatus,
      session: { id }
    } = this.props;

    updateSessionStatus(id, SESSION_FINISHED);
  };

  finishForCurrentUser = () => {
    this.setState({ isFinished: true });
  };

  abortSession = () => {
    const {
      updateSessionStatus,
      session: { id }
    } = this.props;

    updateSessionStatus(id, SESSION_ABORTED);
  };

  runSessionAgain = () => {
    const {
      updateSessionStatus,
      session: { id }
    } = this.props;

    updateSessionStatus(id, SESSION_RUN_AGAIN);
  };

  runSessionAgainFresh = () => {
    const {
      updateSessionStatus,
      session: { id }
    } = this.props;

    updateSessionStatus(id, SESSION_RUN_AGAIN_FRESH);
  };

  addUserStory = () => {
    // const {
    //   updateSessionStatus,
    //   session: { id }
    // } = this.props;
    // updateSessionStatus(id, SESSION_RUN_AGAIN_FRESH);
  };

  noStoriesLeftForCurrentUser = state => state.sessionStarted && !state.remainingStories.length;

  goToNextStory = () => {
    this.setState(prevState => ({
      isFinished: this.noStoriesLeftForCurrentUser(prevState),
      currentStory: prevState.remainingStories.shift(),
      remainingStories: prevState.remainingStories,
      currentTimeLeft: ESTIMATE_TIME_LIMIT
    }));
  };

  sendEstimate = (storyId, estimateValue) => {
    const {
      provideEstimate,
      session: { id: sessionId }
    } = this.props;

    provideEstimate(sessionId, storyId, estimateValue);
    this.goToNextStory();
  };

  currentUserIsModerator = () => {
    const {
      session: { moderator }
    } = this.props;

    return moderator === getCurrentUserId();
  };

  renderBasedOnStatus = () => {
    const {
      session: { status, participants, userStories }
    } = this.props;
    const { currentStory, currentTimeLeft, estimatingOptions, isFinished } = this.state;
    const currentUserIsModerator = this.currentUserIsModerator();

    if (isFinished) {
      return <UserGaveAllEstimates />;
    }

    switch (status) {
      case SESSION_INITIALIZING:
        return <SessionInitializing />;
      case SESSION_WAITING_FOR_PARTICIPANTS:
        return <SessionWaitingForParticipants />;
      case SESSION_PENDING_LAUNCH:
        return currentUserIsModerator ? (
          <PendingForModerator participants={participants} startSession={this.startSession} />
        ) : (
          <PendingForUser />
        );
      case SESSION_ABORTED:
        return currentUserIsModerator ? (
          <AbortedForModerator participants={participants} startSession={this.startSession} />
        ) : (
          <AbortedForUser />
        );
      case SESSION_IN_PROGRESS:
        return currentUserIsModerator ? (
          <InProgressForModerator
            finishSession={this.finishSession}
            abortSession={this.abortSession}
            userStories={userStories}
          />
        ) : (
          <InProgressForUser
            currentStory={currentStory}
            currentTimeLeft={currentTimeLeft}
            estimatingOptions={estimatingOptions}
            sendEstimate={this.sendEstimate}
          />
        );
      case SESSION_FINISHED:
        return currentUserIsModerator ? <FinishedForModerator /> : <FinishedForUser />;
      case SESSION_COMPLETED:
        return currentUserIsModerator ? (
          <CompletedForModerator
            runSessionAgain={this.runSessionAgain}
            runSessionAgainFresh={this.runSessionAgainFresh}
            addUserStory={this.addUserStory}
            userStories={userStories}
          />
        ) : (
          <UserGaveAllEstimates />
        );
      default:
        return <SessionError />;
    }
  };

  render() {
    const { session } = this.props;

    if (!session) {
      return <SessionInitializing />;
    }

    const { name, status } = session;

    return (
      <div>
        <h1>{name}</h1>
        <h4>{status}</h4>
        {this.renderBasedOnStatus()}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const session = state.sessions.byId[ownProps.match.params.id];

  if (session) {
    const participants = session.participants.map(id => getUserNameById(state, id));
    session.participants = participants;
  }

  return { session };
};

Session.propTypes = {
  joinSession: PropTypes.func.isRequired,
  updateSessionStatus: PropTypes.func.isRequired,
  provideEstimate: PropTypes.func.isRequired,
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
    { joinSession, updateSessionStatus, provideEstimate }
  )(Session)
);
