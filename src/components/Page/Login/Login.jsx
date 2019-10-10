import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import UserLoginForm from "../../Form/UserLoginForm";

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

const Heading = styled.h1`
  margin-bottom: 4rem;
`;

const Login = props => {
  const { handleSubmit, handleInputChange } = props;

  return (
    <PageWrapper>
      <div>
        <Heading>Planning Poker</Heading>
        <UserLoginForm handleSubmit={handleSubmit} handleInputChange={handleInputChange} />
      </div>
    </PageWrapper>
  );
};

Login.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired
};

export default Login;
