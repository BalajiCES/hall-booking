import React from 'react';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import Signin from '../components/signin/signin';
import Signup from '../components/signup/signup';
import constant from '../const/const';
import routes from '../routes';
import { PublicRoute, ProtectedRoute } from '../util/helper-functions';
import AdminRouteControl from './admin-route-control';
import RouteControl from './owner-route-control';
import UserRouterControl from './user-route-control';

// Destructuring
const { SIGNUP, OWNER_PATH, USER_BASE_PATH, ADMIN_PATH } = routes;

// APP Level Routes
function AppRoutes() {
  return (
    <BrowserRouter>
      <Switch>
        {/* common */}
        <PublicRoute exact path="/" component={Signin} />
        <PublicRoute exact path={SIGNUP} component={Signup} />

        {/* Admin */}
        <ProtectedRoute
          path={ADMIN_PATH}
          component={AdminRouteControl}
          access={constant.ADMIN}
        />

        {/* Owner */}
        <ProtectedRoute
          path={OWNER_PATH}
          component={RouteControl}
          access={constant.OWNER}
        />

        {/* user */}
        <ProtectedRoute
          path={USER_BASE_PATH + '*'}
          component={UserRouterControl}
          access={constant.USER}
        />

        {/* Custom 404 Error page */}
        <Route path="*" component={() => '404 PAGE NOT FOUND'} />
      </Switch>
    </BrowserRouter>
  );
}

export default AppRoutes;
