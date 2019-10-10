import styled from "styled-components";

const Paragraph = styled.p`
  text-align: ${props => props.textAlign || "inherit"}
  font-size: 1.4rem;
  margin-bottom: 2rem;
`;

export default Paragraph;
