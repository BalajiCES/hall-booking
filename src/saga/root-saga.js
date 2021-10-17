import { all } from 'redux-saga/effects';
import watcherSignUpSaga from '../components/signup/data/signup-saga';
import watcherSigninSaga from '../components/signin/data/sigin-saga';
import watcherRegisterSaga from '../components/admin/register-hall/data/register-saga';
import watcherProfileSaga from '../components/common/profile/data/profile-saga';
import watcherHallListingSaga from '../components/user/dashboard/data/user-dashbaord-saga';
import watcherBookingStatusSaga from '../components/user/booking-status/data/booking-status-saga';
import watcherBookingRequestSaga from '../components/admin/booking-request/data/booking-requests-saga';

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
