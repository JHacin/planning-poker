import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import ConfirmButton from "../Button/ConfirmButton";
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
      <ConfirmButton type="submit">Login</ConfirmButton>
    </Form>
  );
};

UserLoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired
};

export default UserLoginForm;
