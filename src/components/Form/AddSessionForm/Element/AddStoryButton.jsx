import React from "react";
import { FormContext } from "../../../Page/AddSession";
import AddActionButton from "../../../Button/AddActionButton";

const AddStoryButton = () => (
  <FormContext.Consumer>
    {({ handleAddUserStory, userStories }) => {
      return (
        <AddActionButton type="button" onClick={handleAddUserStory}>
          {`+ Add${userStories.length ? " another " : " "}user story`}
        </AddActionButton>
      );
    }}
  </FormContext.Consumer>
);

export default AddStoryButton;
