import React from "react";
import styled from "styled-components";
import Submit from "./Element/Submit";
import { FormContext } from "../../Page/AddSession";
import SessionNameField from "./Element/SessionNameField";
import ScaleTypeSelect from "./Element/ScaleTypeSelect";
import AddStoryButton from "./Element/AddStoryButton";
import UserStoriesList from "./Element/UserStoriesList";

const SpaceBetween = styled.div`
  display: flex;
  justify-content: space-between;
`;

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

          <Submit />
        </form>
      )}
    </FormContext.Consumer>
  );
};

export default AddSessionForm;
