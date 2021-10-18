import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Profile from '../components/common/profile/profile';
import BookingStatus from '../components/user/booking-status/booking-status';
import UserDashBaord from '../components/user/dashboard/user-dashboard';
import NavBar from '../components/user/navbar/navbar';
import BookingHistory from '../components/user/user-booking-history/booking-history';
import { BOOKING_STATUS, DASHBOARD, BOOKING_HISTORY, PROFILE } from '../routes';

function UserRouterControl() {
  return (
    <div>
      <NavBar />
      <Switch>
        <Route exact path={DASHBOARD} component={UserDashBaord} />
        <Route exact path={BOOKING_STATUS} component={BookingStatus} />
        <Route exact path={BOOKING_HISTORY} component={BookingHistory} />
        <Route exact path={PROFILE} component={Profile} />
        {/* Custom 404 Error page */}
        <Route path="*" component={() => '404 PAGE NOT FOUND'} />
      </Switch>
    </div>
  );
}

export default UserRouterControl;
