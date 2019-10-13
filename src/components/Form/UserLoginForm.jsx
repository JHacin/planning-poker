import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import SubmitButton from "../Button/SubmitButton";
import StyledTextfield from "./StyledElement/StyledTextField";

const Form = styled.form`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  width: 200px;
`;

const UserLoginForm = props => {
  const { handleSubmit, handleInputChange } = props;

  return (
    <Form onSubmit={e => handleSubmit(e)}>
      <StyledTextfield
        placeholder="Username..."
        required
        onChange={e => handleInputChange(e.target.value)}
      />
      <SubmitButton type="submit">Login</SubmitButton>
    </Form>
  );
};

UserLoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired
};

export default UserLoginForm;
