import React from "react";
import { FormContext } from "../../../Page/AddSession";
import Paragraph from "../../../Text/Paragraph";
import SubmitButton from "../../../Button/SubmitButton";

const Submit = () => (
  <FormContext.Consumer>
    {({ userStories }) =>
      userStories.length ? (
        <div>
          <SubmitButton display="block" margin="2rem auto">
            Start
          </SubmitButton>
          <Paragraph textAlign="center">
            This will start your session and allow participants to join.
          </Paragraph>
        </div>
      ) : (
        false
      )
    }
  </FormContext.Consumer>
);

export default Submit;
