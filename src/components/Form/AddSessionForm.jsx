import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import scaleTypes from "../../scaleTypes";
import { SCALE_FIBONACCI } from "../../constants";
import StyledTextfield from "./Element/StyledTextField";
import StyledSelect from "./Element/StyledSelect";
import Paragraph from "../Text/Paragraph";
import AddActionButton from "../Button/AddActionButton";
import StyledTextArea from "./Element/StyledTextArea";
import SubmitButton from "../Button/SubmitButton";

const ScaleTypeOptionList = ({ onChange }) => {
  return (
    <StyledSelect
      onChange={e => onChange(e.target.value)}
      defaultValue={SCALE_FIBONACCI}
      width="20%"
    >
      {scaleTypes.map(type => (
        <option key={type.machineName} value={type.machineName}>
          {type.title}
        </option>
      ))}
    </StyledSelect>
  );
};

const SpaceBetween = styled.div`
  display: flex;
  justify-content: space-between;
`;

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

const AddSessionForm = props => {
  const {
    handleSubmit,
    handleNameChange,
    handleScaleTypeChange,
    handleAddUserStory,
    onUserStoryInputChange,
    userStories
  } = props;

  return (
    <form onSubmit={e => handleSubmit(e)}>
      <SpaceBetween>
        <StyledTextfield
          required
          placeholder="My session name..."
          onChange={e => handleNameChange(e.target.value)}
          width="55%"
        />
        <ScaleTypeOptionList onChange={handleScaleTypeChange} />
      </SpaceBetween>

      <AddActionButton type="button" onClick={handleAddUserStory}>
        + Add
        {userStories.length ? " another " : " "}
        user story
      </AddActionButton>

      {userStories.length ? (
        <div>
          {userStories.map(story => (
            <UserStoryRow>
              <StyledTextArea
                key={story.id}
                required
                autoFocus
                rows="3"
                onChange={e => onUserStoryInputChange(story.id, e.target.value)}
                width="100%"
                padding="0.4rem 6% 0.4rem 0.4rem"
              />
              <UserStoryRemove>
                <FontAwesomeIcon icon={faTimesCircle} />
              </UserStoryRemove>
            </UserStoryRow>
          ))}
        </div>
      ) : (
        <Paragraph>You need to add some user stories before you can start this session.</Paragraph>
      )}

      {userStories.length ? (
        <div>
          <SubmitButton display="block" margin="2rem auto">
            Start
          </SubmitButton>
          <Paragraph textAlign="center">
            This will start your session and allow participants to join.
          </Paragraph>
        </div>
      ) : (
        false
      )}
    </form>
  );
};

ScaleTypeOptionList.propTypes = {
  onChange: PropTypes.func.isRequired
};

AddSessionForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleNameChange: PropTypes.func.isRequired,
  handleScaleTypeChange: PropTypes.func.isRequired,
  onUserStoryInputChange: PropTypes.func.isRequired,
  handleAddUserStory: PropTypes.func.isRequired,
  userStories: PropTypes.arrayOf(PropTypes.shape({})).isRequired
};

export default AddSessionForm;
