import React from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "styled-components/macro";
import { GlobalStyle } from "styles/global-style";

import Nav from "components/nav/nav";
import Home from "components/pages/home/home";
import { theme } from "styles/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <GlobalStyle />
        <Nav />
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
