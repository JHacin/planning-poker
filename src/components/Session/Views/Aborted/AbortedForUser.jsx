import React from "react";
import { Link } from "react-router-dom";
import CenterText from "../../../Container/CenterText";
import SmallHeading from "../../../Text/Heading/SmallHeading";
import Paragraph from "../../../Text/Paragraph";
import FluidContainer from "../../../Container/FluidContainer";

const AbortedForUser = () => {
  return (
    <FluidContainer>
      <CenterText>
        <SmallHeading>Oh My!</SmallHeading>
        <Paragraph>Looks like the moderator aborted the session.</Paragraph>
        <Link to="/">Back to Dashboard</Link>
      </CenterText>
    </FluidContainer>
  );
};

export default AbortedForUser;
