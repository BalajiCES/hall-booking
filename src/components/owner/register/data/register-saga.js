import { call, takeEvery, put } from 'redux-saga/effects';
import register from './register-actions';
import {
  registerHallAPI,
  listHallById,
  listSingleHallById,
  updateSingleHallById
} from '../../../../api/register-api';
import endPoint from '../../../../endpoints';
import routes from '../../../../routes';

function* registerAPICall(action) {
  try {
    yield put({ type: register.REGISTER_DATA_LOADING, payload: '' });
    const res = yield call(registerHallAPI, endPoint.HALLS, action.payload);
    action.history.push(routes.OWNER_DASHBOARD);
    yield put({ type: register.REGISTER_DATA_SUCCESS, payload: res });
  } catch (err) {
    yield put({ type: register.REGISTER_DATA_ERROR, payload: err });
  }
}

function* listSingleHall(action) {
  try {
    yield put({ type: register.REGISTER_DATA_LOADING, payload: '' });
    const res = yield call(
      listSingleHallById,
      `${endPoint.HALLS}/${action.payload}`
    );
    yield put({ type: register.REGISTER_DATA_SUCCESS, payload: res });
  } catch (err) {
    console.log(err);
  }
}

function* updateSigleHall(action) {
  const { payload = {}, id } = action;
  try {
    yield put({ type: register.REGISTER_DATA_LOADING, payload: '' });
    const res = yield call(
      updateSingleHallById,
      `${endPoint.HALLS}/${id}`,
      payload
    );
    yield put({ type: register.REGISTER_DATA_SUCCESS, payload: res });
    action.history.push(routes.OWNER_DASHBOARD);
  } catch (err) {
    console.log(err);
  }
}

function* listHallByIdCall(action) {
  try {
    yield put({ type: register.LIST_REGISTER_ID_LOADING, payload: '' });
    const res = yield call(
      listHallById,
      `${endPoint.OWNER_HALLS}/${action.payload}`
    );
    const { data = {} } = res;
    yield put({ type: register.LIST_REGISTER_ID_SUCCESS, payload: data });
  } catch (err) {
    yield put({ type: register.LIST_REGISTER_ID_ERROR, payload: err });
  }
}

function* watcherRegisterSaga() {
  yield takeEvery(register.REGISTER_REQUEST, registerAPICall);
  yield takeEvery(register.LIST_REGISTER_ID_REQUEST, listHallByIdCall);
  yield takeEvery(register.REGISTER_LOADING_REQUEST, listSingleHall);
  yield takeEvery(register.REGISTER_UPDATE_REQUEST, updateSigleHall);
}

export default watcherRegisterSaga;
