import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Logo from 'Assets/Images/pc_img.png';

export class Header extends Component {
  render() {
    return (
      <Wrap>
        <StyledLogo to="/" logo={Logo}>
          <h1 className="a11y">Mr.carmel</h1>
        </StyledLogo>
        <StyledNav>
          <NavList>
            <NavItem>
              <StyledLink to="/">상품목록</StyledLink>
            </NavItem>
            <NavItem>
              <StyledLink to="/recentList">조회이력</StyledLink>
            </NavItem>
          </NavList>
        </StyledNav>
      </Wrap>
    );
  }
}
const Wrap = styled.header`
  position: fixed;
  top: 0;
  width: 100vw;
  display: flex;
  justify-content: space-between;
  padding: 2rem 4rem;
  font-size: 2rem;
  font-weight: 600;
  background-color: #1b25f0;
  z-index: 200;
`;
const StyledLogo = styled(Link).attrs(({ logo }) => ({
  background: `url(${Logo}) no-repeat top -58px left -590px`,
}))`
  display: block;
  width: 18.2rem;
  height: 3.4rem;
  background: ${({ background }) => background};
  background-size: 1920px;
`;
const StyledNav = styled.nav`
  display: flex;
  justify-content: space-between;
`;
const NavList = styled.ul`
  display: flex;
`;
const NavItem = styled.li`
  color: #fff;
  &:not(:first-child) {
    margin-left: 2rem;
  }
`;
const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  height: 100%;
`;

export default Header;
