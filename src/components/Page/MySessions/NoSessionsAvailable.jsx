import React from "react";
import { Link } from "react-router-dom";
import SubmitButton from "../../Button/SubmitButton";
import Paragraph from "../../Text/Paragraph";

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
