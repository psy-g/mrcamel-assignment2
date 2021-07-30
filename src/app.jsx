import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components/macro";
import { GlobalStyle } from "styles/global-style";

import { theme } from "styles/theme";

import ProductDetailPage from "pages/ProductDetailPage";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <GlobalStyle />
        <Route exact path="/product/:id" component={ProductDetailPage} />
      </Router>
    </ThemeProvider>
  );
}

export default App;
