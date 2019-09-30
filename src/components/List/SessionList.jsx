import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { getTitle } from "../../scaleTypes";

const SessionDetails = styled.ul`
  display: table-row;
  font-size: 1.5rem;
`;

const SessionDetailsItem = styled.li`
  display: table-cell;
  padding: 0 2rem 1.5rem 0;

  @media all and (max-width: 767px) {
    padding: 0 1rem 1.5rem 1rem;

    &:first-child {
      padding-left: 0;
    }
  }
`;

const Session = ({ session }) => {
  const { id: sessionId, name, scaleType, moderator } = session;

  return (
    <SessionDetails key={sessionId}>
      <SessionDetailsItem>
        <Link to={`/sessions/${sessionId}`}>{name}</Link>
      </SessionDetailsItem>
      <SessionDetailsItem>{getTitle(scaleType)}</SessionDetailsItem>
      <SessionDetailsItem>{`moderated by ${moderator.username}`}</SessionDetailsItem>
    </SessionDetails>
  );
};

Session.propTypes = {
  session: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    scaleType: PropTypes.string.isRequired,
    moderator: PropTypes.shape({
      username: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};

const ListHeading = styled.h3`
  font-size: 2.25rem;
  margin-bottom: 1.5rem;
`;

const SessionList = ({ sessions }) => {
  const { idList, byId } = sessions;
  return (
    <div>
      <ListHeading>Available sessions to join</ListHeading>
      <ul>
        {idList.map(id => (
          <Session key={id} session={byId[id]} />
        ))}
      </ul>
    </div>
  );
};

SessionList.propTypes = {
  sessions: PropTypes.shape({
    idList: PropTypes.arrayOf(PropTypes.number),
    byId: PropTypes.objectOf(PropTypes.shape({})).isRequired
  }).isRequired
};

export default SessionList;
