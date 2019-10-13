import React from "react";
import { ESTIMATE_NEEDS_MORE_INFO, ESTIMATE_IS_UNDOABLE } from "../../../../constants";
import SessionContext from "../../Context";

const InProgressForUser = () => (
  <SessionContext.Consumer>
    {({ currentStory, currentTimeLeft, estimatingOptions, sendEstimate }) => (
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
            <button
              type="submit"
              onClick={() => sendEstimate(currentStory.id, ESTIMATE_IS_UNDOABLE)}
            >
              Undoable
            </button>
          </li>
        </ul>
      </div>
    )}
  </SessionContext.Consumer>
);

export default InProgressForUser;
