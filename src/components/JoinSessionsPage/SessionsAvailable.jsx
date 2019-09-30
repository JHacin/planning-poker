import React from "react";
import PropTypes from "prop-types";
import SessionList from "../List/SessionList";
import FluidContainer from "../Container/FluidContainer";

const SessionsAvailable = ({ sessions }) => {
  return (
    <FluidContainer>
      <SessionList sessions={sessions} />
    </FluidContainer>
  );
};

SessionsAvailable.propTypes = {
  sessions: PropTypes.shape({
    idList: PropTypes.arrayOf(PropTypes.number),
    byId: PropTypes.objectOf(PropTypes.shape({})).isRequired
  }).isRequired
};

export default SessionsAvailable;
