import { call, takeEvery, put } from 'redux-saga/effects';
import bookingRequest from './booking-requests-actions';
import {
  bookingListByUserID,
  changeBookingStatus
} from '../../../../api/booking_api';
import endPoint from '../../../../endpoints';

function* bookingRequestAPICall(action) {
  try {
    yield put({
      type: bookingRequest.BOOKING_REQUEST_DATA_LOADING,
      payload: ''
    });

    const res = yield call(
      bookingListByUserID,
      `${endPoint.BOOK_OWNER}/${action.payload}`
    );
    yield put({
      type: bookingRequest.BOOKING_REQUEST_DATA_SUCCESS,
      payload: res
    });
  } catch (err) {
    yield put({
      type: bookingRequest.BOOKING_REQUEST_DATA_ERROR,
      payload: err
    });
  }
}

function* changeBookingStatusAPICall(action) {
  try {
    yield call(changeBookingStatus, `${endPoint.BOOK}/${action.id}`, {
      bookingStatus: action.payload
    });
    action.reListingRequests();
  } catch (err) {
    console.log(err);
  }
}

function* watcherBookingRequestSaga() {
  yield takeEvery(
    bookingRequest.BOOKING_REQUEST_REQUEST,
    bookingRequestAPICall
  );
  yield takeEvery(
    bookingRequest.BOOKING_STATUS_CHANGED_REQUEST,
    changeBookingStatusAPICall
  );
}

export default watcherBookingRequestSaga;
