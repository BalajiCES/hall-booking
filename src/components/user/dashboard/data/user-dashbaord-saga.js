import { call, takeEvery, takeLatest, put } from 'redux-saga/effects';
import Swal from 'sweetalert2';
import user from './user-dashboard-actions';
import { listAllHalls } from '../../../../api/register-api';
import { newBooking } from '../../../../api/booking_api';
import endPoint from '../../../../endpoints';
import { getAlertToast } from '../../../../util/helper-functions';

// Destructuring
const {
  USER_DASHBOARD_DATA_LOADING,
  USER_DASHBOARD_DATA_SUCCESS,
  USER_DASHBOARD_DATA_ERROR,
  USER_BOOKING_SUCCESS,
  USER_DASHBOARD_REQUEST,
  USER_BOOKING_REQUEST
} = user;
const { HALLS, BOOK } = endPoint;

// Listing All Halls
function* listingAPICall(action) {
  const { payload } = action;
  try {
    yield put({ type: USER_DASHBOARD_DATA_LOADING, payload: '' });
    const res = yield call(listAllHalls, HALLS, payload);
    yield put({ type: USER_DASHBOARD_DATA_SUCCESS, payload: res });
  } catch (err) {
    yield put({ type: USER_DASHBOARD_DATA_ERROR, payload: err });
  }
}

// Create New booking
function* newBookingAPICall(action) {
  const { payload = {}, closeBooking, reloadHalls, auth } = action;
  try {
    const res = yield call(newBooking, BOOK, payload, auth);
    yield put({ type: USER_BOOKING_SUCCESS, payload: res });
    yield call(closeBooking);
    yield call(reloadHalls);
  } catch (err) {
    const data = JSON.parse(err.message);
    Swal.fire(getAlertToast('error', data.message));
  }
}

function* watcherHallListingSaga() {
  yield takeEvery(USER_DASHBOARD_REQUEST, listingAPICall);
  yield takeLatest(USER_BOOKING_REQUEST, newBookingAPICall);
}

export default watcherHallListingSaga;
