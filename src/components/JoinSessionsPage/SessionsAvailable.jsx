import React from "react";
import PropTypes from "prop-types";
import SessionList from "../List/SessionList";
import FluidContainer from "../Container/FluidContainer";
import { getTitle } from "../../scaleTypes";
import LinkToSession from "../Link/LinkToSession";

const SessionsAvailable = ({ sessions }) => {
  const { idList, byId } = sessions;

  const listItems = idList.map(sessionId => {
    const { scaleType, moderator } = byId[sessionId];
    return [
      <LinkToSession session={byId[sessionId]} />,
      getTitle(scaleType),
      `moderated by ${moderator.username}`
    ];
  });

  return (
    <FluidContainer>
      <SessionList title="Available sessions to join" listItems={listItems} />
    </FluidContainer>
  );
};

SessionsAvailable.propTypes = {
  sessions: PropTypes.shape({
    idList: PropTypes.arrayOf(PropTypes.number),
    byId: PropTypes.objectOf(
      PropTypes.shape({
        scaleType: PropTypes.string.isRequired,
        moderator: PropTypes.shape({
          username: PropTypes.string.isRequired
        })
      })
    ).isRequired
  }).isRequired
};

export default SessionsAvailable;
