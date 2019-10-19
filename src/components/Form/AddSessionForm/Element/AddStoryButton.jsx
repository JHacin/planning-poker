import React from "react";
import { FormContext } from "../../../Page/AddSession";
import ActionButton from "../../../Button/ActionButton";

const AddStoryButton = () => (
  <FormContext.Consumer>
    {({ handleAddUserStory, userStories }) => {
      return (
        <ActionButton type="button" onClick={handleAddUserStory}>
          {`+ Add${userStories.length ? " another " : " "}user story`}
        </ActionButton>
      );
    }}
  </FormContext.Consumer>
);

export default AddStoryButton;
