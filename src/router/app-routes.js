import React from 'react';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import Signin from '../components/signin/signin';
import Signup from '../components/signup/signup';
import {
  ADMIN_DASHBOARD,
  DASHBOARD,
  SIGNUP,
  REGISTER_HALL,
  PROFILE,
  BOOKING_STATUS,
  BOOKING_REQUEST
} from '../routes';
import AdminDashboard from '../components/admin/dashboard/dashboard';
import RegisterHall from '../components/admin/register-hall/register-hall';
import UserDashBaord from '../components/user/dashboard/user-dashboard';
import Profile from '../components/common/profile/profile';
import BookingStatus from '../components/user/booking-status/booking-status';
import BookingRequest from '../components/admin/booking-request/booking-request';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Switch>
        {/* common */}
        <Route exact path="/" component={Signin} />
        <Route exact path={SIGNUP} component={Signup} />
        <Route exact path={PROFILE} component={Profile} />
        {/* Admin */}
        <Route exact path={ADMIN_DASHBOARD} component={AdminDashboard} />
        <Route exact path={REGISTER_HALL} component={RegisterHall} />
        <Route exact path={BOOKING_REQUEST} component={BookingRequest} />
        {/* user */}
        <Route exact path={DASHBOARD} component={UserDashBaord} />
        <Route exact path={BOOKING_STATUS} component={BookingStatus} />
      </Switch>
    </BrowserRouter>
  );
}

export default AppRoutes;
