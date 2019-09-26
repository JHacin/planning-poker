import React from "react";
import PropTypes from "prop-types";

const CompletedForModerator = props => {
  const { runSessionAgain, runSessionAgainFresh, addUserStory, userStories } = props;

  return (
    <div>
      <hr />
      <h3>All estimations made. Well done!</h3>
      <p>
        All participants have estimated all user stories. You can run the session again and apply
        new estimations to the current medians or discard the current estimations and start anew.
      </p>
      <button type="submit" onClick={runSessionAgain}>
        Run again
      </button>
      <span>or</span>
      <button type="submit" onClick={runSessionAgainFresh}>
        Run again fresh
      </button>
      <hr />
      <button type="button" onClick={addUserStory}>
        + Add
        {userStories.length ? " another " : " "}
        user story
      </button>
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
  );
};

CompletedForModerator.propTypes = {
  runSessionAgain: PropTypes.func.isRequired,
  runSessionAgainFresh: PropTypes.func.isRequired,
  addUserStory: PropTypes.func.isRequired,
  userStories: PropTypes.arrayOf(PropTypes.shape).isRequired
};

export default CompletedForModerator;
