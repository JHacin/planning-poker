import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import SubmitButton from "../Button/SubmitButton";

const Paragraph = styled.p`
  font-size: 1.4rem;
  margin-bottom: 2rem;
`;

const NoSessionsAvailable = () => {
  return (
    <div>
      <Paragraph>You do not have any sessions yet. Create one now?</Paragraph>
      <Link to="/my-sessions/add">
        <SubmitButton>Create session</SubmitButton>
      </Link>
    </div>
  );
};

export default NoSessionsAvailable;
