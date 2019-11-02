import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormContext } from "../../../Page/AddSession";
import StyledTextArea from "../../StyledElement/StyledTextArea";
import Paragraph from "../../../Text/Paragraph";

const UserStoryRow = styled.div`
  position: relative;
`;

const UserStoryRemove = styled.div`
  position: absolute;
  top: 3px;
  right: 3px;
  height: calc(100% - 1.5rem - 9px);
  width: calc(6% - 3px);
  padding: 0.4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;

  svg.svg-inline--fa.fa-times-circle {
    width: 3rem;
    height: 4rem;
    padding: 1.15rem 0;

    &:hover {
      cursor: pointer;

      path {
        color: #6f6f6f;
      }
    }
  }
`;

const UserStory = ({ id }) => (
  <FormContext.Consumer>
    {({ onUserStoryInputChange, handleRemoveUserStory }) => (
      <UserStoryRow>
        <StyledTextArea
          required
          autoFocus
          rows="3"
          onChange={e => onUserStoryInputChange(id, e.target.value)}
          width="100%"
          padding="0.4rem 6% 0.4rem 0.4rem"
        />
        <UserStoryRemove>
          <FontAwesomeIcon
            icon={faTimesCircle}
            onClick={() => handleRemoveUserStory(id)}
          />
        </UserStoryRemove>
      </UserStoryRow>
    )}
  </FormContext.Consumer>
);

UserStory.propTypes = {
  id: PropTypes.number.isRequired
};

const UserStoriesList = () => (
  <FormContext.Consumer>
    {({ userStories }) =>
      userStories.length ? (
        <div>
          {userStories.map(story => (
            <UserStory key={story.id} id={story.id} />
          ))}
        </div>
      ) : (
        <Paragraph>
          You need to add some user stories before you can start this session.
        </Paragraph>
      )
    }
  </FormContext.Consumer>
);

export default UserStoriesList;
