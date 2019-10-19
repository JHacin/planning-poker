import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { faUserAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SessionContext from "../../Context";
import LargeHeading from "../../../Text/Heading/LargeHeading";
import Paragraph from "../../../Text/Paragraph";
import ConfirmButton from "../../../Button/ConfirmButton";
import CenterText from "../../../Container/CenterText";

const StyledParticipantList = styled.ul`
  display: flex;
  justify-content: center;
`;

const StyledParticipantAvatar = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 2rem;
  font-size: 2rem;

  .svg-inline--fa {
    border: 3px solid black;
    border-radius: 25%;
    padding: 0.5rem 0;
    height: 3.5rem;
    width: 3.5rem;
    margin-bottom: 0.25rem;
  }

  .participant-name {
    font-size: 1.3rem;
  }
`;

const ParticipantAvatar = ({ participantName }) => (
  <StyledParticipantAvatar>
    <FontAwesomeIcon icon={faUserAlt} />
    <span className="participant-name">{participantName}</span>
  </StyledParticipantAvatar>
);

ParticipantAvatar.propTypes = {
  participantName: PropTypes.string.isRequired
};

const PendingForModerator = () => (
  <SessionContext.Consumer>
    {({ name, participants, startSession }) => (
      <CenterText>
        <LargeHeading>{name}</LargeHeading>
        <StyledParticipantList>
          {participants.map(participant => (
            <ParticipantAvatar key={participant} participantName={participant} />
          ))}
        </StyledParticipantList>
        <ConfirmButton onClick={startSession} display="block" margin="2rem auto">
          Go
        </ConfirmButton>
        <Paragraph>
          You can wait for more participants or start. The session will become unavailable to join
          during the process.
        </Paragraph>
      </CenterText>
    )}
  </SessionContext.Consumer>
);

export default PendingForModerator;
