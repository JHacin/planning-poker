import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import styled from "styled-components";
import { isLoggedIn } from "../util/user";

const StyledHeader = styled.header`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;

  > div {
    padding: 0 20px;
  }

  a {
    margin-left: 5px;

    &.active {
      font-weight: bold;
    }
  }
`;

const StyledHorizontalRule = styled.hr`
  width: 100%;
`;

const Header = () => {
  return (
    isLoggedIn() && (
      <StyledHeader>
        <div>
          <NavLink to="/" activeClassName="active" exact>
            <h1>Planning Poker</h1>
          </NavLink>
        </div>
        <div>
          <NavLink to="/join-sessions" activeClassName="active" exact>
            Join sessions
          </NavLink>
          <NavLink to="/my-sessions" activeClassName="active" exact>
            My sessions
          </NavLink>
          <NavLink to="/logout" activeClassName="active" exact>
            Log out
          </NavLink>
        </div>
        <StyledHorizontalRule />
      </StyledHeader>
    )
  );
};

export default withRouter(Header);
