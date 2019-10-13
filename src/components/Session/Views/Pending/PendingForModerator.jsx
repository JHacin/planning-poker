import React from "react";
import SessionContext from "../../Context";

const PendingForModerator = () => (
  <SessionContext.Consumer>
    {({ participants, startSession }) => (
      <div>
        <ul>
          {participants.map(participant => (
            <li key={participant}>{participant}</li>
          ))}
        </ul>
        <button type="submit" onClick={startSession}>
          Go
        </button>
        <p>
          You can wait for more participants or start. The session will become unavailable to join
          during the process.
        </p>
      </div>
    )}
  </SessionContext.Consumer>
);

export default PendingForModerator;
