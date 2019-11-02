import React from "react";
import { Link } from "react-router-dom";
import CenterText from "../../../Container/CenterText";
import SmallHeading from "../../../Text/Heading/SmallHeading";
import Paragraph from "../../../Text/Paragraph";
import FluidContainer from "../../../Container/FluidContainer";

const FinishedForUser = () => {
  return (
    <FluidContainer>
      <CenterText>
        <SmallHeading>Looks like you are done!</SmallHeading>
        <Paragraph>
          Seems the moderator decided to finish the estimation early. Thanks for
          your input.
        </Paragraph>
        <Link to="/">Back to Dashboard</Link>
      </CenterText>
    </FluidContainer>
  );
};

export default FinishedForUser;
