import { call, takeEvery, put } from 'redux-saga/effects';
import bookingStatus from './booking-status-action';
import { bookingListByUserID } from '../../../../api/booking_api';
import endPoint from '../../../../endpoints';

function* bookingStatusAPICall(action) {
  try {
    yield put({ type: bookingStatus.BOOKING_STATUS_DATA_LOADING, payload: '' });

    const res = yield call(
      bookingListByUserID,
      `${endPoint.BOOK_USER}/${action.payload}`
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
