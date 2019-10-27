import React from "react";
import { FormContext } from "../../Page/AddSession";
import FormSubmit from "./Element/FormSubmit";
import SessionNameField from "./Element/SessionNameField";
import ScaleTypeSelect from "./Element/ScaleTypeSelect";
import AddStoryButton from "./Element/AddStoryButton";
import UserStoriesList from "./Element/UserStoriesList";
import SpaceBetween from "../../Container/SpaceBetween";

const AddSessionForm = () => {
  return (
    <FormContext.Consumer>
      {({ handleSubmit }) => (
        <form onSubmit={e => handleSubmit(e)}>
          <SpaceBetween>
            <SessionNameField />
            <ScaleTypeSelect />
          </SpaceBetween>

          <AddStoryButton />
          <UserStoriesList />

          <FormSubmit />
        </form>
      )}
    </FormContext.Consumer>
  );
};

export default AddSessionForm;
