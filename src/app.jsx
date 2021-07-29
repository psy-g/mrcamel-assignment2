import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components/macro";
import { GlobalStyle } from "styles/global-style";

import Filter from "components/Filter";

import { theme } from "styles/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <GlobalStyle />
        <Route exact path="/recentList" component={Filter} />
      </Router>
    </ThemeProvider>
  );
}

export default App;
