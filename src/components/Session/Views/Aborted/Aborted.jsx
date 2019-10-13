import React from "react";
import SessionContext from "../../Context";
import AbortedForModerator from "./AbortedForModerator";
import AbortedForUser from "./AbortedForUser";

const Aborted = () => (
  <SessionContext.Consumer>
    {({ currentUserIsModerator }) =>
      currentUserIsModerator ? <AbortedForModerator /> : <AbortedForUser />
    }
  </SessionContext.Consumer>
);

export default Aborted;
