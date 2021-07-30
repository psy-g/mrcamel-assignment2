import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components/macro";

const Wrap = styled.div`
  font-size: 2rem;
  font-weight: 600;
  padding: 2rem 4rem;
  background-color: #1b25f0;
`;

const NavLists = styled.ul`
  display: flex;
  justify-content: space-between;
`;

const SideWrap = styled.div`
  display: flex;
`;
const NavList = styled.li`
  cursor: pointer;
`;

const SideNavList = styled.li`
  margin-left: 2rem;
`;

export class Nav extends Component {
  render() {
    return (
      <Wrap>
        <NavLists>
          <Link to="/">
            <NavList>미스터카멜</NavList>
          </Link>
          <SideWrap>
            <Link to="/">
              <SideNavList>상품목록</SideNavList>
            </Link>
            <Link to="/">
              <SideNavList>조회이력</SideNavList>
            </Link>
          </SideWrap>
        </NavLists>
      </Wrap>
    );
  }
}

export default Nav;
