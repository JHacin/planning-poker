import React from "react";
import PendingForModerator from "./PendingForModerator";
import PendingForUser from "./PendingForUser";
import SessionContext from "../../Context";

const Pending = () => (
  <SessionContext.Consumer>
    {({ currentUserIsModerator }) =>
      currentUserIsModerator ? <PendingForModerator /> : <PendingForUser />
    }
  </SessionContext.Consumer>
);

export default Pending;
