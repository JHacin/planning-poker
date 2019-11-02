import React from "react";
import { Link } from "react-router-dom";
import FluidContainer from "../../../Container/FluidContainer";
import CenterText from "../../../Container/CenterText";
import SmallHeading from "../../../Text/Heading/SmallHeading";
import Paragraph from "../../../Text/Paragraph";

const UserGaveAllEstimates = () => {
  return (
    <FluidContainer>
      <CenterText>
        <SmallHeading>All done!</SmallHeading>
        <Paragraph>Thanks for participating.</Paragraph>
        <Link to="/">Back to Dashboard</Link>
      </CenterText>
    </FluidContainer>
  );
};

export default UserGaveAllEstimates;
