import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components/macro";
import { GlobalStyle } from "styles/global-style";

import { theme } from "styles/theme";
import ModalSortingSelector from "components/modal_sorting_selector";


function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <GlobalStyle />
        <ModalSortingSelector />
      </Router>
    </ThemeProvider>
  );
}

export default App;
