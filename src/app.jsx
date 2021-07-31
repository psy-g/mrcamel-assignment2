import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { GlobalStyle } from "styles/global-style";

import Home from "pages/home";
import ProductDetail from "pages/product_detail";
import RecentList from "pages/recent_list";

function App() {
  return (
      <Router>
        <GlobalStyle />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/product/:id" component={ProductDetail} />
          <Route path="/recentList" component={RecentList} />
        </Switch>
      </Router>
  );
}

export default App;
