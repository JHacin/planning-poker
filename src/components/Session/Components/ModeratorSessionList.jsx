import React from "react";
import styled from "styled-components";
import SessionContext from "../Context";

const ListRow = styled.li`
  display: flex;
  justify-content: space-between;
`;

const ModeratorSessionList = () => (
  <SessionContext.Consumer>
    {({ userStories }) => (
      <div>
        <ul>
          {userStories.map(story => (
            <ListRow key={story.id}>
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
            </ListRow>
          ))}
        </ul>
      </div>
    )}
  </SessionContext.Consumer>
);

export default ModeratorSessionList;
