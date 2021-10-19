import React from 'react';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import Signin from '../components/signin/signin';
import Signup from '../components/signup/signup';
import routes from '../routes';
import { PublicRoute, ProtectedRoute } from '../util/helper-functions';
import RouteControl from './owner-route-control';
import UserRouterControl from './user-route-control';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Switch>
        {/* common */}
        <PublicRoute exact path="/" component={Signin} />
        <PublicRoute exact path={routes.SIGNUP} component={Signup} />

        {/* Owner */}
        <ProtectedRoute path={routes.OWNER_PATH} component={RouteControl} />

        {/* user */}
        <ProtectedRoute
          path={routes.USER_BASE_PATH + '*'}
          component={UserRouterControl}
        />

        {/* Custom 404 Error page */}
        <Route path="*" component={() => '404 PAGE NOT FOUND'} />
      </Switch>
    </BrowserRouter>
  );
}

export default AppRoutes;
