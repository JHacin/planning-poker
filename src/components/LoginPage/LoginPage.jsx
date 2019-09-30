import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import SubmitButton from "../Button/SubmitButton";

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

const Heading = styled.h1`
  margin-bottom: 4rem;
`;

const Form = styled.form`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  width: 200px;
`;

const UsernameInput = styled.input`
  margin-bottom: 1.5rem;
  padding: 0.4rem;
  border: 3px solid #000;
  font-weight: 600;
  transition: box-shadow 0.1s ease-in-out;

  &::placeholder {
    font-weight: 600;
  }

  &:hover,
  &:focus {
    box-shadow: 1px 1px 4px 0px #828282;
  }
`;

const LoginPage = props => {
  const { handleSubmit, handleInputChange } = props;

  return (
    <PageWrapper>
      <div>
        <Heading>Planning Poker</Heading>
        <Form onSubmit={e => handleSubmit(e)}>
          <UsernameInput
            placeholder="Username..."
            required
            onChange={e => handleInputChange(e.target.value)}
          />
          <SubmitButton type="submit">Login</SubmitButton>
        </Form>
      </div>
    </PageWrapper>
  );
};

LoginPage.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired
};

export default LoginPage;
