import { call, takeEvery, put } from 'redux-saga/effects';
import adminRequests from './admin-dashboard-actions';
import { listAllBookings } from '../../../../api/booking_api';
import { listAllUser } from '../../../../api/auth-api';
import endPoint from '../../../../endpoints';

// Destructuring
const {
  ADMIN_REQUEST_DATA_LOADING,
  ADMIN_REQUEST_DATA_SUCCESS,
  ADMIN_REQUEST_DATA_ERROR,
  ADMIN_HALL_REQUEST_REQUEST,
  ADMIN_USER_REQUEST_REQUEST,
  ADMIN_HALL_REQUEST_DATA_SUCCESS
} = adminRequests;
const { HALLS, USER } = endPoint;

// Admin Hall Request SAGA
function* adminHallRequestSaga() {
  try {
    yield put({
      type: ADMIN_REQUEST_DATA_LOADING,
      payload: ''
    });

    const res = yield call(listAllBookings, HALLS);

    yield put({
      type: ADMIN_REQUEST_DATA_SUCCESS,
      payload: res
    });
  } catch (err) {
    yield put({
      type: ADMIN_REQUEST_DATA_ERROR,
      payload: err
    });
  }
}

// Admin User Request SAGA
function* adminUserRequestSaga() {
  try {
    yield put({
      type: ADMIN_REQUEST_DATA_LOADING,
      payload: ''
    });

    const res = yield call(listAllUser, USER);

    yield put({
      type: ADMIN_HALL_REQUEST_DATA_SUCCESS,
      payload: res
    });
  } catch (err) {
    yield put({
      type: ADMIN_REQUEST_DATA_ERROR,
      payload: err
    });
  }
}

// watcher admin saga
function* watcherAdminSaga() {
  yield takeEvery(ADMIN_HALL_REQUEST_REQUEST, adminHallRequestSaga);
  yield takeEvery(ADMIN_USER_REQUEST_REQUEST, adminUserRequestSaga);
}

export default watcherAdminSaga;
