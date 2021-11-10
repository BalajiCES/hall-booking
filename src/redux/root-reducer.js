import { combineReducers } from 'redux';
import signinReducer from '../components/signin/data/signin-reducer';
import signupReducer from '../components/signup/data/signup-reducer';
import registerReducer from '../components/owner/register/data/register-reducer';
import profileReducer from '../components/common/profile/data/profile-reducer';
import hallListingReducer from '../components/user/dashboard/data/user-dashboard-reducer';
import bookingStatusReducer from '../components/user/bookings/data/booking-status-reducer';
import bookingRequestReducer from '../components/owner/bookings/data/booking-requests-reducer';
import adminRequestReducer from '../components/admin/dashboard/data/admin-dashboard-reducer';

// combine All Reducers
export default combineReducers({
  signinReducer,
  signupReducer,
  registerReducer,
  profileReducer,
  hallListingReducer,
  bookingStatusReducer,
  bookingRequestReducer,
  adminRequestReducer
});
