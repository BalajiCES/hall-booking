import { call, takeEvery, put } from 'redux-saga/effects';
import bookingRequest from './booking-requests-actions';
import {
  bookingListByUserID,
  changeBookingStatus
} from '../../../../api/booking_api';

function* bookingRequestAPICall(action) {
  try {
    yield put({
      type: bookingRequest.BOOKING_REQUEST_DATA_LOADING,
      payload: ''
    });

    const res = yield call(
      bookingListByUserID,
      `http://localhost:5000/book/admin/${action.payload}`
    );
    console.log('Res', res);
    yield put({
      type: bookingRequest.BOOKING_REQUEST_DATA_SUCCESS,
      payload: res
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: bookingRequest.BOOKING_REQUEST_DATA_ERROR,
      payload: err
    });
  }
}

function* changeBookingStatusAPICall(action) {
  console.log('Called Once');
  console.log('Action', action);
  try {
    const res = yield call(
      changeBookingStatus,
      `http://localhost:5000/book/${action.id}`,
      {
        bookingStatus: action.payload
      }
    );
    console.log('Res', res);
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
