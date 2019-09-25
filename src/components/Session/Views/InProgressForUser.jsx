import React from "react";
import PropTypes from "prop-types";
import { ESTIMATE_NEEDS_MORE_INFO, ESTIMATE_IS_UNDOABLE } from "../../../constants";

const InProgressForUser = props => {
  const { currentStory, currentTimeLeft, estimatingOptions, sendEstimate } = props;

  return (
    <div>
      <div>Session in progress...</div>
      <hr />
      <p>
        <strong>Time left: </strong>
        {currentTimeLeft}
      </p>
      <span>{currentStory.text}</span>
      <ul>
        {estimatingOptions.map(option => (
          <li key={option.value}>
            <button type="submit" onClick={() => sendEstimate(currentStory.id, option.value)}>
              {option.label}
            </button>
          </li>
        ))}
        <li>
          <button
            type="submit"
            onClick={() => sendEstimate(currentStory.id, ESTIMATE_NEEDS_MORE_INFO)}
          >
            Needs info
          </button>
        </li>
        <li>
          <button type="submit" onClick={() => sendEstimate(currentStory.id, ESTIMATE_IS_UNDOABLE)}>
            Undoable
          </button>
        </li>
      </ul>
    </div>
  );
};

InProgressForUser.propTypes = {
  currentStory: PropTypes.shape().isRequired,
  currentTimeLeft: PropTypes.number.isRequired,
  estimatingOptions: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  sendEstimate: PropTypes.func.isRequired
};

export default InProgressForUser;
