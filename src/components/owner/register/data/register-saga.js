import { call, takeEvery, put } from 'redux-saga/effects';
import Swal from 'sweetalert2';
import register from './register-actions';
import {
  registerHallAPI,
  listHallById,
  listSingleHallById,
  updateSingleHallById
} from '../../../../api/register-api';
import endPoint from '../../../../endpoints';
import routes from '../../../../routes';
import { getAlertToast } from '../../../../util/helper-functions';
import constant from '../../../../const/const';
import errors from '../../../../const/error';

// Destructuring
const {
  REGISTER_DATA_LOADING,
  REGISTER_DATA_SUCCESS,
  REGISTER_DATA_ERROR,
  LIST_REGISTER_ID_LOADING,
  LIST_REGISTER_ID_SUCCESS,
  LIST_REGISTER_ID_ERROR,
  REGISTER_REQUEST,
  LIST_REGISTER_ID_REQUEST,
  REGISTER_LOADING_REQUEST,
  REGISTER_UPDATE_REQUEST
} = register;
const { HALLS, OWNER_HALLS } = endPoint;
const { hallSuccess, sucessUpdate } = errors;
const { SUCCESS, WARNING } = constant;
const { OWNER_DASHBOARD } = routes;

// Register a new Hall
function* registerAPICall(action) {
  const { payload = {}, auth, history } = action;
  try {
    yield put({ type: REGISTER_DATA_LOADING, payload: '' });
    const res = yield call(registerHallAPI, HALLS, payload, auth);
    yield put({ type: REGISTER_DATA_SUCCESS, payload: res });
    Swal.fire(getAlertToast(SUCCESS, hallSuccess));
    history.push(OWNER_DASHBOARD);
  } catch (err) {
    yield put({ type: REGISTER_DATA_ERROR, payload: err });
  }
}

// Listing Single Hall
function* listSingleHall(action) {
  const { payload = {} } = action;
  try {
    yield put({ type: REGISTER_DATA_LOADING, payload: '' });
    const res = yield call(listSingleHallById, `${HALLS}/${payload}`);
    yield put({ type: REGISTER_DATA_SUCCESS, payload: res });
  } catch (err) {
    Swal.fire(getAlertToast(WARNING, err));
  }
}

// Update single Hall
function* updateSigleHall(action) {
  const { payload = {}, id, auth, history } = action;
  try {
    yield put({ type: REGISTER_DATA_LOADING, payload: '' });
    const res = yield call(
      updateSingleHallById,
      `${HALLS}/${id}`,
      payload,
      auth
    );
    yield put({ type: REGISTER_DATA_SUCCESS, payload: res });
    Swal.fire(getAlertToast(SUCCESS, sucessUpdate));
    history.push(OWNER_DASHBOARD);
  } catch (err) {
    Swal.fire(getAlertToast(WARNING, err));
  }
}

// Listing Single hall
function* listHallByIdCall(action) {
  const { payload = {} } = action;
  try {
    yield put({ type: LIST_REGISTER_ID_LOADING, payload: '' });
    const res = yield call(listHallById, `${OWNER_HALLS}/${payload}`);
    const { data = {} } = res;
    yield put({ type: LIST_REGISTER_ID_SUCCESS, payload: data });
  } catch (err) {
    yield put({ type: LIST_REGISTER_ID_ERROR, payload: err });
  }
}

function* watcherRegisterSaga() {
  yield takeEvery(REGISTER_REQUEST, registerAPICall);
  yield takeEvery(LIST_REGISTER_ID_REQUEST, listHallByIdCall);
  yield takeEvery(REGISTER_LOADING_REQUEST, listSingleHall);
  yield takeEvery(REGISTER_UPDATE_REQUEST, updateSigleHall);
}

export default watcherRegisterSaga;
