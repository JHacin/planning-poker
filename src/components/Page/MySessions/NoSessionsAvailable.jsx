import React from "react";
import { Link } from "react-router-dom";
import ConfirmButton from "../../Button/ConfirmButton";
import Paragraph from "../../Text/Paragraph";

const NoSessionsAvailable = () => {
  return (
    <div>
      <Paragraph>You do not have any sessions yet. Create one now?</Paragraph>
      <Link to="/my-sessions/add">
        <ConfirmButton>Create session</ConfirmButton>
      </Link>
    </div>
  );
};

export default NoSessionsAvailable;
