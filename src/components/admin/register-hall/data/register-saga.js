import { call, takeEvery, put } from 'redux-saga/effects';
import register from './register-actions';
import { registerHallAPI, listHallById } from '../../../../api/register-api';

function* registerAPICall(action) {
  try {
    yield put({ type: register.REGISTER_DATA_LOADING, payload: '' });
    const res = yield call(
      registerHallAPI,
      'http://localhost:5000/halls',
      action.payload
    );
    console.log('Res', res);
    action.history.push('/admin/dashboard');
    yield put({ type: register.REGISTER_DATA_SUCCESS, payload: res });
  } catch (err) {
    yield put({ type: register.REGISTER_DATA_ERROR, payload: err });
  }
}

function* listHallByIdCall(action) {
  try {
    yield put({ type: register.LIST_REGISTER_ID_LOADING, payload: '' });
    const res = yield call(
      listHallById,
      `http://localhost:5000/halls/${action.payload}`
    );
    const { data = {} } = res;
    console.log('Res', res, data);
    yield put({ type: register.LIST_REGISTER_ID_SUCCESS, payload: data });
  } catch (err) {
    yield put({ type: register.LIST_REGISTER_ID_ERROR, payload: err });
  }
}

function* watcherRegisterSaga() {
  yield takeEvery(register.REGISTER_REQUEST, registerAPICall);
  yield takeEvery(register.LIST_REGISTER_ID_REQUEST, listHallByIdCall);
}

export default watcherRegisterSaga;
