import { call, takeEvery, put } from 'redux-saga/effects';
import bookingStatus from './booking-status-action';
import {
  bookingListByUserID,
  listAllBookings
} from '../../../../api/booking_api';
import endPoint from '../../../../endpoints';

function* bookingStatusAPICall(action) {
  try {
    yield put({ type: bookingStatus.BOOKING_STATUS_DATA_LOADING, payload: '' });

    const res = yield call(
      bookingListByUserID,
      `${endPoint.BOOK_USER}/${action.payload}`
    );
    yield put({
      type: bookingStatus.BOOKING_STATUS_DATA_SUCCESS,
      payload: res
    });
  } catch (err) {
    yield put({ type: bookingStatus.BOOKING_STATUS_DATA_ERROR, payload: err });
  }
}

function* allBookings(action) {
  try {
    const res = yield call(
      listAllBookings,
      `${endPoint.BOOKINGS_HALL}/${action.payload}`
    );
    yield put({
      type: bookingStatus.BOOKINGS_SUCCESS_ALL_REQUEST,
      payload: res
    });
  } catch (err) {
    console.log(err);
  }
}

function* watcherBookingStatusSaga() {
  yield takeEvery(bookingStatus.BOOKING_STATUS_REQUEST, bookingStatusAPICall);
  yield takeEvery(bookingStatus.BOOKINGS_ALL_REQUEST, allBookings);
}

export default watcherBookingStatusSaga;
