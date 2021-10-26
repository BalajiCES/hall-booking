import { call, takeEvery, takeLatest, put } from 'redux-saga/effects';
import Swal from 'sweetalert2';
import user from './user-dashboard-actions';
import { listAllHalls } from '../../../../api/register-api';
import { newBooking } from '../../../../api/booking_api';
import endPoint from '../../../../endpoints';
import { getAlertToast } from '../../../../util/helper-functions';

function* listingAPICall(action) {
  console.log('action', action);
  const { payload } = action;
  try {
    yield put({ type: user.USER_DASHBOARD_DATA_LOADING, payload: '' });
    const res = yield call(listAllHalls, endPoint.HALLS, payload);
    console.log('Res', res);
    yield put({ type: user.USER_DASHBOARD_DATA_SUCCESS, payload: res });
  } catch (err) {
    yield put({ type: user.USER_DASHBOARD_DATA_ERROR, payload: err });
  }
}

function* newBookingAPICall(action) {
  console.log('Action', action.payload);
  try {
    const res = yield call(newBooking, endPoint.BOOK, action.payload);
    console.log(res);
    yield put({ type: user.USER_BOOKING_SUCCESS, payload: res });
    yield call(action.closeBooking);
    yield call(action.reloadHalls);
  } catch (err) {
    console.log('err', err);
    Swal.fire(getAlertToast('error', err.message));
  }
}

function* watcherHallListingSaga() {
  yield takeEvery(user.USER_DASHBOARD_REQUEST, listingAPICall);
  yield takeLatest(user.USER_BOOKING_REQUEST, newBookingAPICall);
}

export default watcherHallListingSaga;
