import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import { isAuthenticated } from "./services/auth";

// Pages import
import Logon from './pages/Logon';
import Register from './pages/Register';
import Profile from './pages/Profile';
import NewSecret from './pages/NewIncident';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )
      }
    />
);

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={ Logon }/>
            <Route path="/register" component={ Register }/>
            <Route path="/profile" component={ Profile } />
            <Route path="/incidents/new" component={ NewSecret } />
            {/* 404 */}
            <Route path="*" component={() => <h1>Page not found</h1>} />
        </Switch>
    </BrowserRouter>
);

export default Routes;