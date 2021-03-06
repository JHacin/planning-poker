import React from "react";
import SessionContext from "../../Context";
import SpaceBetween from "../../../Container/SpaceBetween";
import MediumHeading from "../../../Text/Heading/MediumHeading";
import Paragraph from "../../../Text/Paragraph";
import SmallHeading from "../../../Text/Heading/SmallHeading";
import ModeratorViewTopFrame from "../../Components/ModeratorViewTopFrame";
import ModeratorViewActionButton from "../../Components/ModeratorViewActionButton";
import ModeratorUserStoryList from "../../Components/ModeratorUserStoryList";
import { getTitle } from "../../../../scaleTypes";
import { SESSION_ABORTED, SESSION_FORCE_FINISHED } from "../../../../constants";

const InProgressForModerator = () => (
  <SessionContext.Consumer>
    {({ name, scaleType, updateStatus }) => (
      <div>
        <SpaceBetween>
          <MediumHeading>{name}</MediumHeading>
          <MediumHeading>{getTitle(scaleType)}</MediumHeading>
        </SpaceBetween>
        <ModeratorViewTopFrame>
          <SmallHeading>Participants are still estimating...</SmallHeading>
          <Paragraph>
            You can finish the session with the current results or abort it.
            Aborting will cause all of the estimations to be discarded.
          </Paragraph>
          <ModeratorViewActionButton
            text="Finish"
            onClick={() => updateStatus(SESSION_FORCE_FINISHED)}
          />
          <span className="action-divider">or</span>
          <ModeratorViewActionButton
            text="Abort"
            onClick={() => updateStatus(SESSION_ABORTED)}
          />
        </ModeratorViewTopFrame>
        <ModeratorUserStoryList />
      </div>
    )}
  </SessionContext.Consumer>
);

export default InProgressForModerator;
