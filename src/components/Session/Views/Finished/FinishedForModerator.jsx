import React from "react";
import SessionContext from "../../Context";
import CenterText from "../../../Container/CenterText";
import SmallHeading from "../../../Text/Heading/SmallHeading";
import Paragraph from "../../../Text/Paragraph";
import FluidContainer from "../../../Container/FluidContainer";
import ModeratorViewActionButton from "../../Components/ModeratorViewActionButton";
import { SESSION_WAITING_FOR_PARTICIPANTS } from "../../../../constants";

const FinishedForModerator = () => (
  <SessionContext.Consumer>
    {({ updateStatus }) => (
      <FluidContainer>
        <CenterText>
          <SmallHeading>Session finished.</SmallHeading>
          <Paragraph>
            Estimation values made up until now have been stored. You can
            restart the session process and apply new estimation values on top
            of the existing ones.
          </Paragraph>
          <ModeratorViewActionButton
            text="Restart"
            onClick={() => updateStatus(SESSION_WAITING_FOR_PARTICIPANTS)}
          />
        </CenterText>
      </FluidContainer>
    )}
  </SessionContext.Consumer>
);

export default FinishedForModerator;
