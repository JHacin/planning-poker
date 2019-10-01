import React from "react";
import PropTypes from "prop-types";
import SessionList from "../List/SessionList";
import { getTitle } from "../../scaleTypes";
import { getStatusLabel } from "../../util/session";
import LinkToSession from "../Link/LinkToSession";

const SessionsAvailable = ({ sessions }) => {
  const listItems = sessions.map(session => {
    const { scaleType, status } = session;
    return [<LinkToSession session={session} />, getTitle(scaleType), getStatusLabel(status)];
  });

  return <SessionList listItems={listItems} />;
};

SessionsAvailable.propTypes = {
  sessions: PropTypes.arrayOf(
    PropTypes.shape({
      scaleType: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired
    })
  ).isRequired
};

export default SessionsAvailable;
