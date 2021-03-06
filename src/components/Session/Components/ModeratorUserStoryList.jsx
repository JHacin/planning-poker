import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import {
  faQuestionCircle,
  faExclamationCircle,
  faSpinner
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SessionContext from "../Context";
import {
  ESTIMATE_IS_UNDOABLE,
  ESTIMATE_NEEDS_MORE_INFO,
  ESTIMATE_NOT_GIVEN
} from "../../../constants";

const StyledListWrapper = styled.div`
  &.no-margin-top {
    > ul {
      margin-top: 0;
    }
  }
`;

const StyledList = styled.ul`
  margin-top: 5rem;
`;

const StyledListRow = styled.li`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
`;

const StyledUserStoryText = styled.div`
  border: 2px solid #000;
  width: 80%;
  padding: 0.5rem;
  font-size: 1.3rem;
  font-weight: 600;
`;

const StyledUserStoryAverage = styled.div`
  width: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3.5rem;
`;

const FormattedAverage = ({ average }) => {
  switch (average) {
    case ESTIMATE_NOT_GIVEN:
      return average; // Todo: handle this differently.
    case ESTIMATE_IS_UNDOABLE:
      return <FontAwesomeIcon icon={faExclamationCircle} />;
    case ESTIMATE_NEEDS_MORE_INFO:
      return <FontAwesomeIcon icon={faQuestionCircle} />;
    default:
      return average;
  }
};

const UserStoryAverage = ({ story }) => {
  const { receivedAllEstimates, average } = story;
  return (
    <StyledUserStoryAverage>
      {receivedAllEstimates ? (
        <FormattedAverage average={average} />
      ) : (
        <FontAwesomeIcon icon={faSpinner} spin />
      )}
    </StyledUserStoryAverage>
  );
};

UserStoryAverage.propTypes = {
  story: PropTypes.shape({
    receivedAllEstimates: PropTypes.bool.isRequired,
    average: PropTypes.number
  }).isRequired
};

const UserStory = ({ story }) => {
  const { text } = story;
  return (
    <StyledListRow>
      <StyledUserStoryText>{text}</StyledUserStoryText>
      <UserStoryAverage story={story} />
    </StyledListRow>
  );
};

UserStory.propTypes = {
  story: PropTypes.shape({
    text: PropTypes.string.isRequired
  }).isRequired
};

const ModeratorUserStoryList = ({ customClassName }) => (
  <SessionContext.Consumer>
    {({ userStories }) => (
      <StyledListWrapper className={customClassName}>
        <StyledList>
          {userStories.map(story => (
            <UserStory key={story.id} story={story} />
          ))}
        </StyledList>
      </StyledListWrapper>
    )}
  </SessionContext.Consumer>
);

ModeratorUserStoryList.propTypes = {
  customClassName: PropTypes.string
};

ModeratorUserStoryList.defaultProps = {
  customClassName: undefined
};

export default ModeratorUserStoryList;
