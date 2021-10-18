import React from 'react';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import Signin from '../components/signin/signin';
import Signup from '../components/signup/signup';
import { SIGNUP, ADMIN_PATH, USER_BASE_PATH } from '../routes';
import { PublicRoute, ProtectedRoute } from '../util/helper-functions';
import AdminRouteControl from './admin-route-control';
import UserRouterControl from './user-route-control';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Switch>
        {/* common */}
        <PublicRoute exact path="/" component={Signin} />
        <PublicRoute exact path={SIGNUP} component={Signup} />

        {/* Admin */}
        <ProtectedRoute path={ADMIN_PATH} component={AdminRouteControl} />

        {/* user */}
        <ProtectedRoute
          path={USER_BASE_PATH + '*'}
          component={UserRouterControl}
        />

        {/* Custom 404 Error page */}
        <Route path="*" component={() => '404 PAGE NOT FOUND'} />
      </Switch>
    </BrowserRouter>
  );
}

export default AppRoutes;
