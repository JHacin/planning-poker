import React from "react";
import InProgressForModerator from "./InProgressForModerator";
import InProgressForUser from "./InProgressForUser";
import SessionContext from "../../Context";

const InProgress = () => (
  <SessionContext.Consumer>
    {({ currentUserIsModerator }) =>
      currentUserIsModerator ? (
        <InProgressForModerator />
      ) : (
        <InProgressForUser />
      )
    }
  </SessionContext.Consumer>
);

export default InProgress;
