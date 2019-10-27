import React from "react";
import SessionContext from "../../Context";
import SpaceBetween from "../../../Container/SpaceBetween";
import MediumHeading from "../../../Text/Heading/MediumHeading";
import Paragraph from "../../../Text/Paragraph";
import SmallHeading from "../../../Text/Heading/SmallHeading";
import ModeratorViewTopFrame from "../../Components/ModeratorViewTopFrame";
import ModeratorViewActionButton from "../../Components/ModeratorViewActionButton";
import ModeratorSessionList from "../../Components/ModeratorSessionList";

const InProgressForModerator = () => (
  <SessionContext.Consumer>
    {({ name, scaleType, finishSession, abortSession }) => (
      <div>
        <SpaceBetween>
          <MediumHeading>{name}</MediumHeading>
          <MediumHeading>{scaleType}</MediumHeading>
        </SpaceBetween>
        <ModeratorViewTopFrame>
          <SmallHeading>Participants are still estimating...</SmallHeading>
          <Paragraph>
            You can finish the session with the current results or abort it. Aborting will cause all
            of the estimations to be discarded.
          </Paragraph>
          <ModeratorViewActionButton text="Finish" onClick={finishSession} />
          <span className="action-divider">or</span>
          <ModeratorViewActionButton text="Abort" onClick={abortSession} />
        </ModeratorViewTopFrame>
        <ModeratorSessionList />
      </div>
    )}
  </SessionContext.Consumer>
);

export default InProgressForModerator;
