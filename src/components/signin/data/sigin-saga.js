import { call, takeEvery, put } from 'redux-saga/effects';
import signin from './signin-actions';
import { signinAPI } from '../../../api/auth-api';
import routes from '../../../routes';
import endPoint from '../../../endpoints';
import constant from '../../../const/const';

// Destructuring
const { TOKEN, ID, ROLE, OWNER } = constant;
const { OWNER_DASHBOARD, DASHBOARD } = routes;
const {
  SIGNIN_DATA_LOADING,
  SIGNIN_DATA_SUCCESS,
  SIGNIN_DATA_ERROR,
  SIGNIN_REQUEST
} = signin;
const { LOGIN } = endPoint;

// worker saga
function* signInApiCall(action) {
  const { payload = {}, history } = action;
  try {
    yield put({ type: SIGNIN_DATA_LOADING, payload: '' });
    const res = yield call(signinAPI, LOGIN, payload);
    yield put({ type: SIGNIN_DATA_SUCCESS, payload: res });

    const { token, userId, role } = res;
    // Store that in Session Storage
    sessionStorage.setItem(TOKEN, token);
    sessionStorage.setItem(ID, userId);
    sessionStorage.setItem(ROLE, role);

    // Navigate to related Dashboard
    if (role === OWNER) {
      history.push(OWNER_DASHBOARD);
    } else {
      history.push(DASHBOARD);
    }
  } catch (err) {
    yield put({ type: SIGNIN_DATA_ERROR, payload: err });
  }
}

// watcher saga
function* watcherSigninSaga() {
  yield takeEvery(SIGNIN_REQUEST, signInApiCall);
}

export default watcherSigninSaga;
