import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  SESSION_STATUS_WAITING_FOR_PARTICIPANTS,
  SESSION_STATUS_INITIALIZING,
  SESSION_STATUS_PENDING_LAUNCH,
  SESSION_STATUS_IN_PROGRESS,
  SESSION_STATUS_FINISHED,
  SESSION_STATUS_ABORTED
} from "../constants";
import {
  joinSession,
  updateSessionStatus,
  provideEstimate
} from "../redux/actions";
import { getCurrentUserUuid } from "../util/user";
import { getUserNameById } from "../redux/selectors";
import scaleTypes from "../scaleTypes";

class Session extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionStarted: false,
      currentStory: null,
      remainingStories: [],
      currentTimeLeft: 30,
      estimatingOptions: [],
      isFinished: false
    };
  }

  static getDerivedStateFromProps(props, state) {
    const { session } = props;

    if (!state.sessionStarted && session) {
      const userStories = [...session.userStories];

      return {
        sessionStarted: true,
        currentStory: userStories.shift(),
        remainingStories: userStories,
        currentTimeLeft: 30,
        estimatingOptions: scaleTypes.find(
          type => type.machineName === session.scaleType
        ).options
      };
    }

    if (state.sessionStarted) {
      switch (session.status) {
        case SESSION_STATUS_FINISHED:
          return { isFinished: true };
        case SESSION_STATUS_ABORTED:
          return {
            sessionStarted: false,
            currentStory: null,
            remainingStories: session.userStories,
            currentTimeLeft: 30
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
        params: { id: sessionId }
      }
    } = this.props;

    joinSession(sessionId, getCurrentUserUuid());
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      currentStory,
      currentTimeLeft,
      isFinished,
      sessionStarted
    } = this.state;

    if (!this.currentUserIsModerator()) {
      if (!prevState.sessionStarted) {
        this.startTimer();
      }

      if (sessionStarted && !isFinished) {
        if (!currentStory) {
          this.finishForCurrentUser();
        }

        if (!currentTimeLeft) {
          this.sendEstimate(currentStory.id, "TIME_EXPIRED");
        }
      } else if (this.timer) {
        clearInterval(this.timer);
        this.timer = false;
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

  startSession = () => {
    const {
      updateSessionStatus,
      session: { id }
    } = this.props;

    updateSessionStatus(id, SESSION_STATUS_IN_PROGRESS);
  };

  finishSession = () => {
    const {
      updateSessionStatus,
      session: { id }
    } = this.props;

    updateSessionStatus(id, SESSION_STATUS_FINISHED);
  };

  finishForCurrentUser = () => {
    this.setState({ isFinished: true });
  };

  abortSession = () => {
    const {
      updateSessionStatus,
      session: { id }
    } = this.props;

    updateSessionStatus(id, SESSION_STATUS_ABORTED);
  };

  goToNextStory = () => {
    this.setState(prevState => ({
      isFinished:
        prevState.sessionStarted && !prevState.remainingStories.length,
      currentStory: prevState.remainingStories.shift(),
      remainingStories: prevState.remainingStories,
      currentTimeLeft: 30
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

  estimatingView = () => {
    const { currentStory, currentTimeLeft, estimatingOptions } = this.state;

    return currentStory ? (
      <div>
        <p>
          <strong>Time left: </strong>
          {currentTimeLeft}
        </p>
        <span>{currentStory.text}</span>
        <ul>
          {estimatingOptions.map(option => (
            <li key={option.value}>
              <button
                type="submit"
                onClick={() => this.sendEstimate(currentStory.id, option.value)}
              >
                {option.label}
              </button>
            </li>
          ))}
          <li>
            <button
              type="submit"
              onClick={() =>
                this.sendEstimate(currentStory.id, "NEEDS_MORE_INFO")
              }
            >
              Needs info
            </button>
          </li>
          <li>
            <button
              type="submit"
              onClick={() => this.sendEstimate(currentStory.id, "UNDOABLE")}
            >
              Undoable
            </button>
          </li>
        </ul>
      </div>
    ) : (
      <div>No stories left.</div>
    );
  };

  renderBasedOnStatus = () => {
    const {
      session: { status, participants, userStories }
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
      case SESSION_STATUS_ABORTED:
        return this.currentUserIsModerator() ? (
          <div>
            <div>You have aborted the session. Restart when ready.</div>
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
          <div>
            <div>
              The moderator has aborted the session. Please wait for the session
              to be rerun.
            </div>
            <div>Waiting to start...</div>
          </div>
        );
      case SESSION_STATUS_IN_PROGRESS:
        return this.currentUserIsModerator() ? (
          <div>
            <hr />
            <h3>Participants are still estimating...</h3>
            <p>
              You can finish thre session with the current results or abort it.
              Aborting will cause all of the estimations to be discarded.
            </p>
            <button type="submit" onClick={this.finishSession}>
              Finish
            </button>
            <span>or</span>
            <button type="submit" onClick={this.abortSession}>
              Abort
            </button>
            <hr />
            <div>
              <ul>
                {userStories.map(story => (
                  <li key={story.id}>
                    {story.text}
                    {" | "}
                    <strong>Estimates:</strong>
                    {" | "}
                    {story.estimatesGiven.map(estimate => (
                      <span key={estimate}>
                        {estimate}
                        {" - "}
                      </span>
                    ))}
                    {" | "}
                    <span>
                      {story.receivedAllEstimates
                        ? "Received all estimates"
                        : "Waiting for remaining estimates"}
                    </span>
                    {" | "}
                    <span>
                      {story.average
                        ? story.average
                        : "Will calculate when all estimates are given"}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <div>
            <div>Session in progress...</div>
            <hr />
            {this.estimatingView()}
          </div>
        );

      case SESSION_STATUS_FINISHED:
        return this.currentUserIsModerator() ? (
          <div>You have finished the session.</div>
        ) : (
          <div>The moderator has ended the session.</div>
        );
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
