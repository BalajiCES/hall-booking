import { combineReducers } from 'redux';
import signinReducer from '../components/signin/data/signin-reducer';
import signupReducer from '../components/signup/data/signup-reducer';
import registerReducer from '../components/admin/register-hall/data/register-reducer';
import profileReducer from '../components/common/profile/data/profile-reducer';
import hallListingReducer from '../components/user/dashboard/data/user-dashboard-reducer';
import bookingStatusReducer from '../components/user/booking-status/data/booking-status-reducer';
import bookingRequestReducer from '../components/admin/booking-request/data/booking-requests-reducer';

export default combineReducers({
  signinReducer,
  signupReducer,
  registerReducer,
  profileReducer,
  hallListingReducer,
  bookingStatusReducer,
  bookingRequestReducer
});
