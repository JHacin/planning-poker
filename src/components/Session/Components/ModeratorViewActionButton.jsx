import React from "react";
import PropTypes from "prop-types";
import ActionButton from "../../Button/ActionButton";

const ModeratorViewActionButton = ({ text, ...otherProps }) => (
  <ActionButton
    type="submit"
    textDecoration="underline"
    marginBottom="0"
    {...otherProps}
  >
    {text}
  </ActionButton>
);

ModeratorViewActionButton.propTypes = {
  text: PropTypes.string.isRequired
}

export default ModeratorViewActionButton;
