import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Admin from '../components/admin/dashboard/admin/admin';
import Users from '../components/admin/dashboard/user/users';
import AdminNavbar from '../components/admin/navbar/navbar';
import routes from '../routes';

// Destructuring
const { HALLS_PATH, USERS_PATH } = routes;

// Admin Layout Structure
function AdminRouteControl() {
  return (
    <div>
      <AdminNavbar />

      <Switch>
        <Route exact path={HALLS_PATH} component={Admin} />
        <Route exact path={USERS_PATH} component={Users} />

        {/* Custom 404 Error page */}
        <Route path="*" component={() => '404 PAGE NOT FOUND'} />
      </Switch>
    </div>
  );
}

export default AdminRouteControl;
