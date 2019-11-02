import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";
import {
  SESSION_FORCE_FINISHED,
  SESSION_ABORTED,
  ESTIMATE_TIME_LIMIT,
  ESTIMATE_NOT_GIVEN
} from "../../constants";
import SessionViewRenderer from "./Views/SessionViewRenderer";
import {
  joinSession,
  leaveSession,
  updateSessionStatus,
  provideEstimate
} from "../../redux/actions";
import { getCurrentUserId } from "../../util/user";
import { getUserNameById } from "../../redux/selectors";
import { getOptionsForType } from "../../scaleTypes";
import FluidContainer from "../Container/FluidContainer";
import Initializing from "./Views/Initializing";
import SessionContext from "./Context";

class Session extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionStarted: false,
      isFinished: false,
      currentStory: null,
      currentTimeLeft: ESTIMATE_TIME_LIMIT,
      remainingStories: [],
      estimatingOptions: [],
      leavingSession: false,
      allowReRendering: true
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

    // If the session has just been aborted/finished, stop refreshing the view for ex-participants.
    if (
      state.sessionStarted &&
      session.moderator.id !== getCurrentUserId() &&
      (session.status === SESSION_ABORTED ||
        session.status === SESSION_FORCE_FINISHED)
    ) {
      return {
        ...state,
        allowReRendering: false
      };
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

  shouldComponentUpdate() {
    const { allowReRendering } = this.state;
    return allowReRendering;
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      currentStory,
      currentTimeLeft,
      isFinished,
      sessionStarted
    } = this.state;

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

  leaveCurrentSession = () => {
    const {
      leaveSession,
      match: {
        params: { id }
      }
    } = this.props;

    leaveSession(id, getCurrentUserId());

    this.setState({ leavingSession: true });
  };

  updateStatus = status => {
    const {
      updateSessionStatus,
      session: { id }
    } = this.props;

    updateSessionStatus(id, status);
  };

  finishForCurrentUser = () => {
    this.setState({ isFinished: true });
  };

  addUserStory = () => {
    // const {
    //   updateSessionStatus,
    //   session: { id }
    // } = this.props;
    // updateSessionStatus(id, SESSION_RUN_AGAIN_FRESH);
  };

  noStoriesLeftForCurrentUser = state =>
    state.sessionStarted && !state.remainingStories.length;

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

    return moderator.id === getCurrentUserId();
  };

  render() {
    const { session } = this.props;

    if (!session) {
      return <Initializing />;
    }

    const {
      name,
      status,
      participants,
      moderator,
      userStories,
      scaleType
    } = session;
    const {
      currentStory,
      currentTimeLeft,
      estimatingOptions,
      isFinished,
      leavingSession
    } = this.state;

    if (leavingSession) {
      return <Redirect to="/join-sessions" />;
    }

    return (
      <SessionContext.Provider
        value={{
          name,
          status,
          participants,
          moderator,
          userStories,
          currentStory,
          currentTimeLeft,
          scaleType,
          estimatingOptions,
          isFinished,
          currentUserIsModerator: this.currentUserIsModerator(),
          updateStatus: this.updateStatus,
          sendEstimate: this.sendEstimate,
          addUserStory: this.addUserStory,
          leaveCurrentSession: this.leaveCurrentSession
        }}
      >
        <FluidContainer>
          <SessionViewRenderer />
        </FluidContainer>
      </SessionContext.Provider>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const session = state.sessions.byId[ownProps.match.params.id];

  if (session) {
    const participants = session.participants.map(id =>
      getUserNameById(state, id)
    );
    session.participants = participants;
  }

  return { session };
};

Session.propTypes = {
  joinSession: PropTypes.func.isRequired,
  leaveSession: PropTypes.func.isRequired,
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
    moderator: PropTypes.shape({
      id: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired
    }).isRequired,
    participants: PropTypes.arrayOf(PropTypes.string)
  })
};

Session.defaultProps = {
  session: undefined
};

export default withRouter(
  connect(
    mapStateToProps,
    { joinSession, leaveSession, updateSessionStatus, provideEstimate }
  )(Session)
);
