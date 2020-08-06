import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';
import Panel from '../pages/Panel';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/panel" exact component={Panel} />
      <Route path="/panel/:category/:page" exact component={Panel} />
    </Switch>
  );
};

export default Routes;
