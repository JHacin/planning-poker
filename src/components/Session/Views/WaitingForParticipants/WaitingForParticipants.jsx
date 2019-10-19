import React from "react";
import SessionContext from "../../Context";
import LargeHeading from "../../../Text/Heading/LargeHeading";
import Paragraph from "../../../Text/Paragraph";
import CenterText from "../../../Container/CenterText";

const WaitingForParticipants = () => (
  <SessionContext.Consumer>
    {({ name }) => (
      <CenterText>
        <LargeHeading>{name}</LargeHeading>
        <Paragraph>Waiting for participants to join...</Paragraph>
      </CenterText>
    )}
  </SessionContext.Consumer>
);

export default WaitingForParticipants;
