import React from "react";
import {
  SESSION_WAITING_FOR_PARTICIPANTS,
  SESSION_INITIALIZING,
  SESSION_PENDING_LAUNCH,
  SESSION_IN_PROGRESS,
  SESSION_FORCE_FINISHED,
  SESSION_ABORTED,
  SESSION_COMPLETED,
  SESSION_COMPLETED_WITH_UNDOABLE,
  SESSION_COMPLETED_NEED_MORE_INFO,
  SESSION_COMPLETED_WITH_MISSING_ESTIMATES
} from "../../../constants";
import SessionContext from "../Context";
import Aborted from "./Aborted";
import Completed from "./Completed";
import CompletedForUser from "./Completed/CompletedForUser";
import Finished from "./Finished";
import InProgress from "./InProgress";
import Pending from "./Pending";
import Error from "./Error";
import Initializing from "./Initializing";
import WaitingForParticipants from "./WaitingForParticipants";

const SessionViewRenderer = () => {
  return (
    <SessionContext.Consumer>
      {({ status, isFinished }) => {
        if (isFinished) {
          return <CompletedForUser />;
        }

        switch (status) {
          case SESSION_INITIALIZING:
            return <Initializing />;
          case SESSION_WAITING_FOR_PARTICIPANTS:
            return <WaitingForParticipants />;
          case SESSION_PENDING_LAUNCH:
            return <Pending />;
          case SESSION_ABORTED:
            return <Aborted />;
          case SESSION_IN_PROGRESS:
            return <InProgress />;
          case SESSION_FORCE_FINISHED:
            return <Finished />;
          case SESSION_COMPLETED:
          case SESSION_COMPLETED_WITH_UNDOABLE:
          case SESSION_COMPLETED_NEED_MORE_INFO:
          case SESSION_COMPLETED_WITH_MISSING_ESTIMATES:
            return <Completed />;
          default:
            return <Error />;
        }
      }}
    </SessionContext.Consumer>
  );
};

export default SessionViewRenderer;
