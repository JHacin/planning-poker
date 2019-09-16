import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { SESSION_STATUS_WAITING } from "../constants";

class Session extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isInitialized: false,
      status: null,
      id: null,
      name: "",
      scaleType: "",
      userStories: [],
      owner: ""
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (!state.isInitialized && props.session) {
      return {
        ...props.session,
        isInitialized: true,
        status: SESSION_STATUS_WAITING
      };
    }

    return { ...state };
  }

  initializeSessionState = props => {
    this.setState({ ...props });
  };

  render() {
    const { isInitialized, status, name } = this.state;

    if (!isInitialized) {
      return (
        <div>
          <span>Loading...</span>
        </div>
      );
    }

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
  session: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    scaleType: PropTypes.string.isRequired,
    userStories: PropTypes.array.isRequired,
    owner: PropTypes.string.isRequired
  }).isRequired
};

export default withRouter(
  connect(
    mapStateToProps,
    null
  )(Session)
);
