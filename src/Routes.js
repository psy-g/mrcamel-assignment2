import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from 'Pages/Home/Home';
import ProductDetail from 'Pages/ProductDetail/ProductDetail';
import RecentList from 'Pages/RecentList/RecentList';

import { ROUTES } from 'Constants/Constant';

function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path={ROUTES.HOME} component={Home} />
        <Route exact path={`${ROUTES.PRODUCT}/:id`} component={ProductDetail} />
        <Route path={ROUTES.RECENT_LIST} component={RecentList} />
      </Switch>
    </Router>
  );
}

export default Routes;
