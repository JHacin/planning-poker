import React from "react";
import CompletedForModerator from "./CompletedForModerator";
import CompletedForUser from "./CompletedForUser";
import SessionContext from "../../Context";

const Completed = () => (
  <SessionContext.Consumer>
    {({ currentUserIsModerator }) =>
      currentUserIsModerator ? <CompletedForModerator /> : <CompletedForUser />
    }
  </SessionContext.Consumer>
);

export default Completed;
