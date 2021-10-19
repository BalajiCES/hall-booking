import { all } from 'redux-saga/effects';
import watcherSignUpSaga from '../components/signup/data/signup-saga';
import watcherSigninSaga from '../components/signin/data/sigin-saga';
import watcherRegisterSaga from '../components/owner/register/data/register-saga';
import watcherProfileSaga from '../components/common/profile/data/profile-saga';
import watcherHallListingSaga from '../components/user/dashboard/data/user-dashbaord-saga';
import watcherBookingStatusSaga from '../components/user/bookings/data/booking-status-saga';
import watcherBookingRequestSaga from '../components/owner/bookings/data/booking-requests-saga';

export default function* rootSaga() {
  yield all([
    watcherSignUpSaga(),
    watcherSigninSaga(),
    watcherRegisterSaga(),
    watcherProfileSaga(),
    watcherHallListingSaga(),
    watcherBookingStatusSaga(),
    watcherBookingRequestSaga()
  ]);
}
