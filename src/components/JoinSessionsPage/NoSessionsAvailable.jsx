import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import SubmitButton from "../Button/SubmitButton";

const CenteredWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 68px);
`;

const NoSessionsHeading = styled.h3`
  font-size: 3.5rem;
  margin-bottom: 2rem;
`;

const NoSessionsAvailable = () => {
  return (
    <CenteredWrapper>
      <NoSessionsHeading>Huh, no sessions available. Create one?</NoSessionsHeading>
      <Link to="/my-sessions/add">
        <SubmitButton>Create session</SubmitButton>
      </Link>
    </CenteredWrapper>
  );
};

export default NoSessionsAvailable;
