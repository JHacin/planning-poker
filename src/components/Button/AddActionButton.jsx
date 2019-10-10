import styled from "styled-components";

const AddActionButton = styled.button`
  background: none;
  border: none;
  color: #006ea2;
  font-weight: 600;
  font-size: 1.6rem;
  margin-bottom: 1.5rem;
  transition: text-shadow 0.1s ease-in-out;

  &:hover {
    cursor: pointer;
    text-shadow: 1px 1px 1px #cacaca;
  }
`;

export default AddActionButton;
