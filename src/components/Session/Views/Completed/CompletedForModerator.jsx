import React from "react";
import { oneLine } from "common-tags";
import {
  SESSION_COMPLETED,
  SESSION_COMPLETED_WITH_UNDOABLE,
  SESSION_COMPLETED_NEED_MORE_INFO,
  SESSION_COMPLETED_WITH_MISSING_ESTIMATES
} from "../../../../constants";
import SessionContext from "../../Context";
import MediumHeading from "../../../Text/Heading/MediumHeading";
import {getTitle} from "../../../../scaleTypes";
import SpaceBetween from "../../../Container/SpaceBetween";
import ModeratorViewTopFrame from "../../Components/ModeratorViewTopFrame";
import SmallHeading from "../../../Text/Heading/SmallHeading";
import Paragraph from "../../../Text/Paragraph";
import ModeratorViewActionButton from "../../Components/ModeratorViewActionButton";
import ModeratorUserStoryList from "../../Components/ModeratorUserStoryList";

const getModeratorTopFrameHeading = () => (
  <SessionContext.Consumer>
    {({ status }) => {
      switch (status) {
        case SESSION_COMPLETED:
          return "All estimations made. Well done!";
        case SESSION_COMPLETED_WITH_UNDOABLE:
          return "Done. Some user stories seem to be undoable.";
        case SESSION_COMPLETED_NEED_MORE_INFO:
          return "Done. Some user stories need more information.";
        case SESSION_COMPLETED_WITH_MISSING_ESTIMATES:
          return "Some participants failed to estimate every user story.";
        default:
          return "";
      }
    }}
  </SessionContext.Consumer>
);

const getModeratorTopFrameText = () => (
  <SessionContext.Consumer>
    {({ status }) => {
      switch (status) {
        case SESSION_COMPLETED:
          return oneLine`
            All participants have estimated all user stories.
            You can run the session again and apply new estimations to the current medians
            or discard the current estimations and start anew.
          `;
        case SESSION_COMPLETED_WITH_UNDOABLE:
          return oneLine`
            User stories have been estimated, but some seem undoable.
            Discussion is advised before running again..
          `;
        case SESSION_COMPLETED_NEED_MORE_INFO:
          return oneLine`
            User stories have been estimated, but need some more information.
            Add more information or discuss before running again.
          `;
        case SESSION_COMPLETED_WITH_MISSING_ESTIMATES:
          return oneLine`
            Seems that some participants were not able to estimate all user stories,
            probably due to lost connection. A retried run is advised.
          `;
        default:
          return "";
      }
    }}
  </SessionContext.Consumer>
);

const ModeratorTopFrameActions = () => (
  <SessionContext.Consumer>
    {({ status, runSessionAgain, runSessionAgainFresh }) => {
      switch (status) {
        case SESSION_COMPLETED:
          return (
            <div>
              <ModeratorViewActionButton text="Run again" onClick={runSessionAgain} />
              <span className="action-divider">or</span>
              <ModeratorViewActionButton text="Run again fresh" onClick={runSessionAgainFresh} />
            </div>
          );
        case SESSION_COMPLETED_WITH_UNDOABLE:
        case SESSION_COMPLETED_NEED_MORE_INFO:
        case SESSION_COMPLETED_WITH_MISSING_ESTIMATES:
          return <ModeratorViewActionButton text="Run again" onClick={runSessionAgain} />;
        default:
          return false;
      }
    }}
  </SessionContext.Consumer>
);

const ModeratorTopFrame = () => {
  return (
    <ModeratorViewTopFrame>
      <SmallHeading>{getModeratorTopFrameHeading()}</SmallHeading>
      <Paragraph>{getModeratorTopFrameText()}</Paragraph>
      <ModeratorTopFrameActions />
    </ModeratorViewTopFrame>
  );
};

const CompletedForModerator = () => (
  <SessionContext.Consumer>
    {({ name, scaleType, addUserStory, userStories }) => {
      return (
        <div>
          <SpaceBetween>
            <MediumHeading>{name}</MediumHeading>
            <MediumHeading>{getTitle(scaleType)}</MediumHeading>
          </SpaceBetween>
          <ModeratorTopFrame />
          <ModeratorViewActionButton
            onClick={addUserStory}
            marginTop="2rem"
            marginBottom="2rem"
            text={`+ Add ${userStories.length ? " another " : " "} user story`}
          />
          <ModeratorUserStoryList customClassName="no-margin-top" />
        </div>
      );
    }}
  </SessionContext.Consumer>
);

export default CompletedForModerator;
