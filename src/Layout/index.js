import React, { Component } from 'react';
import styled from 'styled-components/macro';

import Header from 'Layout/Header';

class Layout extends Component {
  render() {
    return (
      <Wrapper>
        <Header />
        <StyledMain>{this.props.children}</StyledMain>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  position: relative;
  width: 100vw;
  min-height: 100vh;
`;
const StyledMain = styled.main`
  width: 100%;
  height: 100%;
  padding-top: 7.4rem;
`;

export default Layout;
