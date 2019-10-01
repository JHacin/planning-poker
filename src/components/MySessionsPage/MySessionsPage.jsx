import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getSessionsCreatedByUser } from "../../redux/selectors";
import { getCurrentUserId } from "../../util/user";
import NoSessionsAvailable from "./NoSessionsAvailable";
import SessionsAvailable from "./SessionsAvailable";
import FluidContainer from "../Container/FluidContainer";
import MediumHeading from "../Heading/MediumHeading";

const MySessionsPage = ({ sessions }) => {
  return (
    <FluidContainer>
      <MediumHeading>My Sessions</MediumHeading>
      {sessions.length ? <SessionsAvailable sessions={sessions} /> : <NoSessionsAvailable />}
    </FluidContainer>
  );
};

MySessionsPage.propTypes = {
  sessions: PropTypes.arrayOf(PropTypes.shape({})).isRequired
};

const mapStateToProps = state => ({
  sessions: getSessionsCreatedByUser(state, getCurrentUserId())
});

export default withRouter(
  connect(
    mapStateToProps,
    null
  )(MySessionsPage)
);
