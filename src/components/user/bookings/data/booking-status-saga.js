import { call, takeEvery, put } from 'redux-saga/effects';
import Swal from 'sweetalert2';
import bookingStatus from './booking-status-action';
import {
  bookingListByUserID,
  listAllBookings
} from '../../../../api/booking_api';
import endPoint from '../../../../endpoints';
import { getAlertToast } from '../../../../util/helper-functions';
import constant from '../../../../const/const';

// Destructuring
const { BOOK_USER, BOOKINGS_HALL } = endPoint;
const { WARNING } = constant;
const {
  BOOKING_STATUS_DATA_LOADING,
  BOOKING_STATUS_DATA_SUCCESS,
  BOOKING_STATUS_DATA_ERROR,
  BOOKINGS_SUCCESS_ALL_REQUEST,
  BOOKING_STATUS_REQUEST,
  BOOKINGS_ALL_REQUEST
} = bookingStatus;

// Booking status Chnage SAGA
function* bookingStatusAPICall(action) {
  const { payload = {} } = action;
  try {
    yield put({ type: BOOKING_STATUS_DATA_LOADING, payload: '' });

    const res = yield call(bookingListByUserID, `${BOOK_USER}/${payload}`);
    yield put({
      type: BOOKING_STATUS_DATA_SUCCESS,
      payload: res
    });
  } catch (err) {
    yield put({ type: BOOKING_STATUS_DATA_ERROR, payload: err });
  }
}

// List All bookings SAGA
function* allBookings(action) {
  const { payload = {} } = action;
  try {
    const res = yield call(listAllBookings, `${BOOKINGS_HALL}/${payload}`);
    yield put({
      type: BOOKINGS_SUCCESS_ALL_REQUEST,
      payload: res
    });
  } catch (err) {
    Swal.fire(getAlertToast(WARNING, err));
  }
}

function* watcherBookingStatusSaga() {
  yield takeEvery(BOOKING_STATUS_REQUEST, bookingStatusAPICall);
  yield takeEvery(BOOKINGS_ALL_REQUEST, allBookings);
}

export default watcherBookingStatusSaga;
