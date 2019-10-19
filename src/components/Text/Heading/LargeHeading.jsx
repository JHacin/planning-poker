import styled from "styled-components";

const LargeHeading = styled.h2`
  text-align: ${props => props.textAlign || "inherit"};
  font-size: 3rem;
  margin-bottom: 2.25rem;
`;

export default LargeHeading;
