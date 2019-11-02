import React from "react";
import SessionContext from "../../Context";
import AbortedForUser from "./AbortedForUser";
import WaitingForParticipants from "../WaitingForParticipants";

const Aborted = () => (
  <SessionContext.Consumer>
    {({ currentUserIsModerator }) =>
      currentUserIsModerator ? <WaitingForParticipants /> : <AbortedForUser />
    }
  </SessionContext.Consumer>
);

export default Aborted;
