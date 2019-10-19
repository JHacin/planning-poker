import React from "react";
import SessionContext from "../../Context";
import LargeHeading from "../../../Text/Heading/LargeHeading";
import Paragraph from "../../../Text/Paragraph";
import CenterText from "../../../Container/CenterText";
import ActionButton from "../../../Button/ActionButton";

const PendingForUser = () => (
  <SessionContext.Consumer>
    {({ name, moderator, leaveCurrentSession }) => (
      <CenterText>
        <LargeHeading>{name}</LargeHeading>
        <Paragraph>{`moderated by ${moderator.username}`}</Paragraph>
        <Paragraph fontWeight="bold">Waiting to start...</Paragraph>
        <ActionButton onClick={leaveCurrentSession} textDecoration="underline">
          Leave
        </ActionButton>
      </CenterText>
    )}
  </SessionContext.Consumer>
);

export default PendingForUser;
