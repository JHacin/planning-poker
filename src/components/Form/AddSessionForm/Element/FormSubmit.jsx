import React from "react";
import { FormContext } from "../../../Page/AddSession";
import Paragraph from "../../../Text/Paragraph";
import ConfirmButton from "../../../Button/ConfirmButton";

const FormSubmit = () => (
  <FormContext.Consumer>
    {({ userStories }) =>
      userStories.length ? (
        <div>
          <ConfirmButton display="block" margin="2rem auto">
            Start
          </ConfirmButton>
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

export default FormSubmit;
