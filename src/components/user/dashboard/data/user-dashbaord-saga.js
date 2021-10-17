import { call, takeEvery, takeLatest, put } from 'redux-saga/effects';
import user from './user-dashboard-actions';
import { listAllHalls } from '../../../../api/register-api';
import { newBooking } from '../../../../api/booking_api';

function* listingAPICall() {
  try {
    yield put({ type: user.USER_DASHBOARD_DATA_LOADING, payload: '' });
    const res = yield call(listAllHalls, 'http://localhost:5000/halls');
    console.log('Res', res);
    yield put({ type: user.USER_DASHBOARD_DATA_SUCCESS, payload: res });
  } catch (err) {
    yield put({ type: user.USER_DASHBOARD_DATA_ERROR, payload: err });
  }
}

function* newBookingAPICall(action) {
  console.log('Action', action.payload);
  try {
    const res = yield call(
      newBooking,
      'http://localhost:5000/book',
      action.payload
    );
    console.log(res);
    yield put({ type: user.USER_BOOKING_SUCCESS, payload: res });
    yield call(action.bookingSuccess);
  } catch (err) {
    console.log(err);
  }
}

function* watcherHallListingSaga() {
  yield takeEvery(user.USER_DASHBOARD_REQUEST, listingAPICall);
  yield takeLatest(user.USER_BOOKING_REQUEST, newBookingAPICall);
}

export default watcherHallListingSaga;
