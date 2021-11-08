import { call, takeEvery, put } from 'redux-saga/effects';
import Swal from 'sweetalert2';
import bookingRequest from './booking-requests-actions';
import {
  bookingListByUserID,
  changeBookingStatus
} from '../../../../api/booking_api';
import endPoint from '../../../../endpoints';
import { getAlertToast } from '../../../../util/helper-functions';
import constant from '../../../../const/const';
import errors from '../../../../const/error';

// Destructuring
const {
  BOOKING_REQUEST_DATA_LOADING,
  BOOKING_REQUEST_DATA_SUCCESS,
  BOOKING_REQUEST_DATA_ERROR,
  BOOKING_REQUEST_REQUEST,
  BOOKING_STATUS_CHANGED_REQUEST
} = bookingRequest;
const { BOOK_OWNER, BOOK } = endPoint;
const { SUCCESS, WARNING } = constant;
const { sucessUpdate } = errors;

// Booking Request SAGA
function* bookingRequestAPICall(action) {
  const { payload = {} } = action;
  try {
    yield put({
      type: BOOKING_REQUEST_DATA_LOADING,
      payload: ''
    });

    const res = yield call(bookingListByUserID, `${BOOK_OWNER}/${payload}`);
    yield put({
      type: BOOKING_REQUEST_DATA_SUCCESS,
      payload: res
    });
  } catch (err) {
    yield put({
      type: BOOKING_REQUEST_DATA_ERROR,
      payload: err
    });
  }
}

// Changing Booking status SAGA
function* changeBookingStatusAPICall(action) {
  const { payload = {}, id, auth, reListingRequests } = action;
  try {
    yield call(
      changeBookingStatus,
      `${BOOK}/${id}`,
      {
        bookingStatus: payload
      },
      auth
    );
    reListingRequests();
    Swal.fire(getAlertToast(SUCCESS, sucessUpdate));
  } catch (err) {
    Swal.fire(getAlertToast(WARNING, err));
  }
}

function* watcherBookingRequestSaga() {
  yield takeEvery(BOOKING_REQUEST_REQUEST, bookingRequestAPICall);
  yield takeEvery(BOOKING_STATUS_CHANGED_REQUEST, changeBookingStatusAPICall);
}

export default watcherBookingRequestSaga;
