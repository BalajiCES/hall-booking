import React from 'react';
import { Route, Switch } from 'react-router-dom';
import OwnerBookingHistory from '../components/owner/bookings/booking-history/booking-history';
import BookingRequest from '../components/owner/bookings/booking-request/booking-request';
import OwnerDashboard from '../components/owner/register/dashboard/dashboard';
import RegisterHall from '../components/owner/register/register/register-hall';
import OwnerNavbar from '../components/owner/navbar/navbar';
import Profile from '../components/common/profile/profile';
import routes from '../routes';

// Owner Layout Structure
function RouteControl() {
  return (
    <div>
      {/* Custom Owner Navbar */}
      <OwnerNavbar />

      <Switch>
        <Route exact path={routes.OWNER_DASHBOARD} component={OwnerDashboard} />
        <Route exact path={routes.REGISTER_HALL} component={RegisterHall} />
        <Route
          exact
          path={routes.REGISTER_HALL_EDIT}
          component={RegisterHall}
        />
        <Route exact path={routes.BOOKING_REQUEST} component={BookingRequest} />
        <Route exact path={routes.OWNER_PROFILE} component={Profile} />
        <Route
          exact
          path={routes.OWNER_BOOKING_HISTORY}
          component={OwnerBookingHistory}
        />

        {/* Custom 404 Error page */}
        <Route path="*" component={() => '404 PAGE NOT FOUND'} />
      </Switch>
    </div>
  );
}

export default RouteControl;
