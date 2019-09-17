import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { SESSION_STATUS_WAITING } from "../constants";
import { joinSession, updateSessionStatus } from "../redux/actions";
import { getCurrentUserUuid } from "../util/user";

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

  render() {
    const { session } = this.props;

    if (!session) {
      return (
        <div>
          <span>Loading...</span>
        </div>
      );
    }

    const { status, name } = session;

    switch (status) {
      case SESSION_STATUS_WAITING:
        return (
          <div>
            <h1>{name}</h1>
            <h3>Waiting for participants to join...</h3>
          </div>
        );
      default:
        return <div>Could not fetch status for this session.</div>;
    }
  }
}

const mapStateToProps = (state, ownProps) => ({
  session: state.sessions.byId[ownProps.match.params.id]
});

Session.propTypes = {
  joinSession: PropTypes.func.isRequired,
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
    moderator: PropTypes.string.isRequired
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
