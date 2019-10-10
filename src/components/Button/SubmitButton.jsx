import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const StyledButton = styled.button`
  display: ${props => props.display || "inline-block"};
  margin: ${props => props.margin || 0};
  padding: 0.75rem 3.5rem;
  background: none;
  box-shadow: 2px 2px 1px #000;
  border: 3px solid #000;
  font-family: "Maven Pro", sans-serif;
  font-weight: 700;
  font-size: 1.4rem;
  transition: background 0.1s ease-in-out;

  &:hover,
  &:focus {
    background: #ececec;
    cursor: pointer;
  }
`;

const SubmitButton = props => {
  const { children, ...otherProps } = props;

  return (
    <StyledButton type="submit" {...otherProps}>
      {children}
    </StyledButton>
  );
};

SubmitButton.propTypes = {
  children: PropTypes.string.isRequired
};

export default SubmitButton;
