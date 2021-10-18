import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AdminBookingHistory from '../components/admin/admin-booking-history/booking-history';
import BookingRequest from '../components/admin/booking-request/booking-request';
import AdminDashboard from '../components/admin/dashboard/dashboard';
import RegisterHall from '../components/admin/register-hall/register-hall';
import AdminNavbar from '../components/admin/admin-navbar/navbar';
import Profile from '../components/common/profile/profile';
import {
  ADMIN_DASHBOARD,
  REGISTER_HALL,
  BOOKING_REQUEST,
  ADMIN_BOOKING_HISTORY,
  ADMIN_PROFILE
} from '../routes';

function AdminRouteControl() {
  return (
    <div>
      <AdminNavbar />
      <Switch>
        <Route exact path={ADMIN_DASHBOARD} component={AdminDashboard} />
        <Route exact path={REGISTER_HALL} component={RegisterHall} />
        <Route exact path={BOOKING_REQUEST} component={BookingRequest} />
        <Route exact path={ADMIN_PROFILE} component={Profile} />
        <Route
          exact
          path={ADMIN_BOOKING_HISTORY}
          component={AdminBookingHistory}
        />
        {/* Custom 404 Error page */}
        <Route path="*" component={() => '404 PAGE NOT FOUND'} />
      </Switch>
    </div>
  );
}

export default AdminRouteControl;
