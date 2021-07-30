import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components/macro";
import { GlobalStyle } from "styles/global-style";

import { theme } from "styles/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <GlobalStyle />
      </Router>
    </ThemeProvider>
  );
}

export default App;
