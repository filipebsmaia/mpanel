import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';
import Home from '../pages/Home';
import Server from '../pages/Applications';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/dashboard" exact component={Home} />
      <Route path="/dashboard/home" exact component={Home} />
      <Route path="/applications/:serverId+" exact component={Server} />
    </Switch>
  );
};

export default Routes;
