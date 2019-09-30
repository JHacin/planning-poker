import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import styled from "styled-components";
import { isLoggedIn } from "../../util/user";

const StyledHeader = styled.header`
  height: 68px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 2.5rem;
  border-bottom: 3px solid #000;

  > div {
    padding: 0 20px;
  }

  @media all and (max-width: 767px) {
    height: 95px;
    flex-direction: column;
    justify-content: center;
    padding-left: 0;
    padding-right: 0;

    > div {
      padding: 0 15px;
    }
  }
`;

const WebsiteTitle = styled(NavLink)`
  font-family: "Maven Pro", sans-serif;
  font-size: 3rem;
  font-weight: 500;
  color: #000;
  text-decoration: none;
  transition: text-shadow 0.1s ease-in-out;

  &:hover {
    text-shadow: 1px 1px 3px #cacaca;
  }
`;

const MenuLink = styled(NavLink)`
  font-size: 1.75rem;
  margin-left: 5px;

  &.active {
    color: #000;
    text-decoration: none;

    &:hover {
      cursor: initial;
    }
  }

  @media all and (max-width: 767px) {
    font-size: 1.5rem;
  }
`;

const MenuLinkDivider = styled.span`
  font-weight: 600;
  color: #000;
  font-size: 2.5rem;

  @media all and (max-width: 767px) {
    font-size: 2rem;
  }
`;

const Header = () => {
  return (
    isLoggedIn() && (
      <StyledHeader>
        <div>
          <WebsiteTitle to="/join-sessions" activeClassName="active">
            Planning Poker
          </WebsiteTitle>
        </div>
        <div>
          <MenuLink to="/join-sessions" activeClassName="active">
            Join sessions
          </MenuLink>
          <MenuLinkDivider> | </MenuLinkDivider>
          <MenuLink to="/my-sessions" activeClassName="active" exact>
            My sessions
          </MenuLink>
          <MenuLinkDivider> | </MenuLinkDivider>
          <MenuLink to="/logout" activeClassName="active" exact>
            Log out
          </MenuLink>
        </div>
      </StyledHeader>
    )
  );
};

export default withRouter(Header);
