import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "styled-components/macro";
import { GlobalStyle } from "styles/global-style";

import Home from "pages/home";
import ProductDetailPage from "pages/product_detail_page";
import RecentList from "pages/recent_list";
import { theme } from "styles/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <GlobalStyle />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/product/:id" component={ProductDetailPage} />
          <Route path="/recentList" component={RecentList} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
