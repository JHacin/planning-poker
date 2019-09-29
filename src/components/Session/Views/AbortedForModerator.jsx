import React from "react";
import PropTypes from "prop-types";

const AbortedForModerator = props => {
  const { participants, startSession } = props;

  return (
    <div>
      <div>You have aborted the session. Restart when ready.</div>
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
  );
};

AbortedForModerator.propTypes = {
  participants: PropTypes.arrayOf(PropTypes.string).isRequired,
  startSession: PropTypes.func.isRequired
};

export default AbortedForModerator;