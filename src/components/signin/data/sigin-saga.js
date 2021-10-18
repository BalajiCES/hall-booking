import { call, takeEvery, put } from 'redux-saga/effects';
import signin from './signin-actions';
import { signinAPI } from '../../../api/auth-api';
import { ADMIN_DASHBOARD, DASHBOARD } from '../../../routes';

function* signInApiCall(action) {
  try {
    yield put({ type: signin.SIGNIN_DATA_LOADING, payload: '' });
    const res = yield call(
      signinAPI,
      'http://localhost:5000/user/login',
      action.payload
    );
    console.log('Res', res);
    yield put({ type: signin.SIGNIN_DATA_SUCCESS, payload: res });

    // store that in local session for further api calls
    sessionStorage.setItem('TOKEN', res.token);
    sessionStorage.setItem('ID', res.userId);
    sessionStorage.setItem('ROLE', res.role);
    if (res.role === 'admin') {
      action.history.push(ADMIN_DASHBOARD);
    } else {
      action.history.push(DASHBOARD);
    }
  } catch (err) {
    console.log(err);
    yield put({ type: signin.SIGNIN_DATA_ERROR, payload: err });
  }
}

function* watcherSigninSaga() {
  yield takeEvery(signin.SIGNIN_REQUEST, signInApiCall);
}

export default watcherSigninSaga;
