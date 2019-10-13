import React from "react";
import { FormContext } from "../../../Page/AddSession";
import StyledTextfield from "../../StyledElement/StyledTextField";

const SessionNameField = () => (
  <FormContext.Consumer>
    {({ handleNameChange }) => (
      <StyledTextfield
        required
        placeholder="My session name..."
        onChange={e => handleNameChange(e.target.value)}
        width="55%"
      />
    )}
  </FormContext.Consumer>
);

export default SessionNameField;
