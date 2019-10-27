import styled from "styled-components";

const ActionButton = styled.button`
  text-decoration: ${props => props.textDecoration || "inherit"};
  margin-top: ${props => props.marginTop || 0};
  margin-bottom: ${props => props.marginBottom || "1.5rem"};
  background: none;
  border: none;
  color: #006ea2;
  font-weight: 600;
  font-size: 1.6rem;
  transition: text-shadow 0.1s ease-in-out;

  &:hover {
    cursor: pointer;
    text-shadow: 1px 1px 1px #cacaca;
  }
`;

export default ActionButton;
