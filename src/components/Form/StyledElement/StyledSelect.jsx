import styled from "styled-components";

const StyledSelect = styled.select`
  width: ${props => props.width || "auto"};
  background: #fff;
  margin-bottom: 1.5rem;
  padding: 0.4rem;
  border: 3px solid #000;
  font-weight: 600;
  transition: box-shadow 0.1s ease-in-out;

  &:hover,
  &:focus {
    box-shadow: 1px 1px 4px 0px #828282;
  }
`;

export default StyledSelect;
