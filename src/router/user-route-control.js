import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Profile from '../components/common/profile/profile';
import BookingStatus from '../components/user/bookings/status/booking-status';
import UserDashBaord from '../components/user/dashboard/user-dashboard';
import NavBar from '../components/user/navbar/navbar';
import BookingHistory from '../components/user/bookings/booking-history/booking-history';
import routes from '../routes';

function UserRouterControl() {
  return (
    <div>
      <NavBar />
      <Switch>
        <Route exact path={routes.DASHBOARD} component={UserDashBaord} />
        <Route exact path={routes.BOOKING_STATUS} component={BookingStatus} />
        <Route exact path={routes.BOOKING_HISTORY} component={BookingHistory} />
        <Route exact path={routes.PROFILE} component={Profile} />
        {/* Custom 404 Error page */}
        <Route path="*" component={() => '404 PAGE NOT FOUND'} />
      </Switch>
    </div>
  );
}

export default UserRouterControl;
