import React from "react";
import FinishedForModerator from "./FinishedForModerator";
import FinishedForUser from "./FinishedForUser";
import SessionContext from "../../Context";

const Finished = () => (
  <SessionContext.Consumer>
    {({ currentUserIsModerator }) =>
      currentUserIsModerator ? <FinishedForModerator /> : <FinishedForUser />
    }
  </SessionContext.Consumer>
);

export default Finished;
