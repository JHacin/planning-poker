import React from "react";
import SessionContext from "../../Context";

const InProgressForModerator = () => (
  <SessionContext.Consumer>
    {({ finishSession, abortSession, userStories }) => (
      <div>
        <hr />
        <h3>Participants are still estimating...</h3>
        <p>
          You can finish thre session with the current results or abort it. Aborting will cause all
          of the estimations to be discarded.
        </p>
        <button type="submit" onClick={finishSession}>
          Finish
        </button>
        <span>or</span>
        <button type="submit" onClick={abortSession}>
          Abort
        </button>
        <hr />
        <div>
          <ul>
            {userStories.map(story => (
              <li key={story.id}>
                {story.text}
                {" | "}
                <strong>Estimates:</strong>
                {" | "}
                {story.estimatesGiven.map(estimate => (
                  <span key={estimate}>
                    {estimate}
                    {" - "}
                  </span>
                ))}
                {" | "}
                <span>
                  {story.receivedAllEstimates
                    ? "Received all estimates"
                    : "Waiting for remaining estimates"}
                </span>
                {" | "}
                <span>
                  {story.average ? story.average : "Will calculate when all estimates are given"}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )}
  </SessionContext.Consumer>
);

export default InProgressForModerator;
