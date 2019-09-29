import React from "react";
import PropTypes from "prop-types";
import {
  SESSION_COMPLETED,
  SESSION_COMPLETED_WITH_UNDOABLE,
  SESSION_COMPLETED_NEED_MORE_INFO,
  SESSION_COMPLETED_WITH_MISSING_ESTIMATES
} from "../../../constants";

const NoIssues = props => {
  const { runSessionAgain, runSessionAgainFresh } = props;

  return (
    <div>
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
    </div>
  );
};

NoIssues.propTypes = {
  runSessionAgain: PropTypes.func.isRequired,
  runSessionAgainFresh: PropTypes.func.isRequired
};

const HasUndoable = props => {
  const { runSessionAgain } = props;

  return (
    <div>
      <h3>Done. Some user stories seem to be undoable.</h3>
      <p>
        User stories have been estimated, but some seem undoable. Discussion is advised before
        running again.
      </p>
      <button type="submit" onClick={runSessionAgain}>
        Run again
      </button>
    </div>
  );
};

HasUndoable.propTypes = {
  runSessionAgain: PropTypes.func.isRequired
};

const NeedsMoreInfo = props => {
  const { runSessionAgain } = props;

  return (
    <div>
      <h3>Done. Some user stories need more information.</h3>
      <p>
        User stories have been estimated, but need some more information. Add more information or
        discuss before running again.
      </p>
      <button type="submit" onClick={runSessionAgain}>
        Run again
      </button>
    </div>
  );
};

NeedsMoreInfo.propTypes = {
  runSessionAgain: PropTypes.func.isRequired
};

const HasMissing = props => {
  const { runSessionAgain } = props;

  return (
    <div>
      <h3>Some participants failed to estimate every user story.</h3>
      <p>
        Seems that some participants were not able to estimate all user stories, probably due to
        lost connection. A retried run is advised.
      </p>
      <button type="submit" onClick={runSessionAgain}>
        Run again
      </button>
    </div>
  );
};

HasMissing.propTypes = {
  runSessionAgain: PropTypes.func.isRequired
};

const StoryList = props => {
  const { userStories } = props;

  return (
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
  );
};

StoryList.propTypes = {
  userStories: PropTypes.arrayOf(PropTypes.shape).isRequired
};

const CompletedForModerator = props => {
  const { runSessionAgain, runSessionAgainFresh, addUserStory, userStories, status } = props;
  let textToShow;

  switch (status) {
    case SESSION_COMPLETED:
      textToShow = (
        <NoIssues runSessionAgain={runSessionAgain} runSessionAgainFresh={runSessionAgainFresh} />
      );
      break;
    case SESSION_COMPLETED_WITH_UNDOABLE:
      textToShow = <HasUndoable runSessionAgain={runSessionAgain} />;
      break;
    case SESSION_COMPLETED_NEED_MORE_INFO:
      textToShow = <NeedsMoreInfo runSessionAgain={runSessionAgain} />;
      break;
    case SESSION_COMPLETED_WITH_MISSING_ESTIMATES:
      textToShow = <HasMissing runSessionAgain={runSessionAgain} />;
      break;
    default:
      break;
  }

  return (
    <div>
      <hr />
      {textToShow}
      <hr />
      <button type="button" onClick={addUserStory}>
        + Add
        {userStories.length ? " another " : " "}
        user story
      </button>
      <StoryList userStories={userStories} />
    </div>
  );
};

CompletedForModerator.propTypes = {
  runSessionAgain: PropTypes.func.isRequired,
  runSessionAgainFresh: PropTypes.func.isRequired,
  addUserStory: PropTypes.func.isRequired,
  userStories: PropTypes.arrayOf(PropTypes.shape).isRequired,
  status: PropTypes.string.isRequired
};

export default CompletedForModerator;
