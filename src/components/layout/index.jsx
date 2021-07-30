import React, { Component } from "react";
import styled, { ThemeProvider } from "styled-components/macro";
import { theme } from "styles/theme";

import Header from "components/layout/header";

const Wrapper = styled.div`
  position: relative;
  /* width: 100%; */
  width: 100vw;
  min-height: 100vh;
`;
const StyledMain = styled.main`
  width: 100%;
  height: 100%;
  padding-top: 6rem;
`;

class Layout extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Wrapper>
          <Header />
          <StyledMain>{this.props.children}</StyledMain>
        </Wrapper>
      </ThemeProvider>
    );
  }
}

export default Layout;
