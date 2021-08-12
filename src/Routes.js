import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from 'Pages/Home/Home';
import ProductDetail from 'Pages/ProductDetail/ProductDetail';
import RecentList from 'Pages/RecentList/RecentList';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/product/:id" component={ProductDetail} />
        <Route path="/recentList" component={RecentList} />
      </Switch>
    </Router>
  );
}

export default App;
