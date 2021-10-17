import { call, takeEvery, put } from 'redux-saga/effects';
import bookingStatus from './booking-status-action';
import { bookingListByUserID } from '../../../../api/booking_api';

function* bookingStatusAPICall(action) {
  try {
    yield put({ type: bookingStatus.BOOKING_STATUS_DATA_LOADING, payload: '' });

    const res = yield call(
      bookingListByUserID,
      `http://localhost:5000/book/user/${action.payload}`
    );
    console.log('Res', res);
    yield put({
      type: bookingStatus.BOOKING_STATUS_DATA_SUCCESS,
      payload: res
    });
  } catch (err) {
    console.log(err);
    yield put({ type: bookingStatus.BOOKING_STATUS_DATA_ERROR, payload: err });
  }
}

function* watcherBookingStatusSaga() {
  yield takeEvery(bookingStatus.BOOKING_STATUS_REQUEST, bookingStatusAPICall);
}

export default watcherBookingStatusSaga;
