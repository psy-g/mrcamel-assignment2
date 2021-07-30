import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { GlobalStyle } from "styles/global-style";

import Home from "pages/home";
import RecentList from "pages/recent_list";


function App() {
  return (
      <Router>
        <GlobalStyle />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/recentList" component={RecentList} />
        </Switch>
      </Router>
  );
}

export default App;
