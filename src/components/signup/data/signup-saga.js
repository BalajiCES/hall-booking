import { put, takeEvery, call } from 'redux-saga/effects';
import signup from './signup-actions';
import { signupAPI } from '../../../api/auth-api';
import endPoint from '../../../endpoints';
import routes from '../../../routes';

// Destructruing
const {
  SIGNUP_DATA_LOADING,
  SIGNUP_DATA_SUCCESS,
  SIGNUP_DATA_ERROR,
  SIGNUP_REQUEST
} = signup;
const { HOME } = routes;
const { SIGNUP } = endPoint;

// worker saga
function* signupAPICall(action) {
  const { payload = {}, history } = action;
  try {
    yield put({ type: SIGNUP_DATA_LOADING, payload: '' });
    const res = yield call(signupAPI, SIGNUP, payload);
    yield put({
      type: SIGNUP_DATA_SUCCESS,
      payload: res
    });
    history.push(HOME);
  } catch (error) {
    const { message } = error;
    const data = JSON.parse(message);
    yield put({
      type: SIGNUP_DATA_ERROR,
      payload: data
    });
  }
}

// watcher saga
function* watcherSignUp() {
  yield takeEvery(SIGNUP_REQUEST, signupAPICall);
}

export default watcherSignUp;
