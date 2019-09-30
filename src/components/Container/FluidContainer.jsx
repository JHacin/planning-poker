import styled from "styled-components";

const FluidContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 6rem 50px 2rem 50px;

  @media all and (max-width: 767px) {
    padding: 2rem 20px 2rem 20px;
  }
`;

export default FluidContainer;
