import styled from "styled-components";

const StyledTextfield = styled.input`
  width: ${props => props.width || "auto"};
  margin-bottom: ${props => props.marginBottom || "1.5rem"};
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

export default StyledTextfield;
