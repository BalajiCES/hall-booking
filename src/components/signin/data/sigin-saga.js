import { call, takeEvery, put } from 'redux-saga/effects';
import signin from './signin-actions';
import { signinAPI } from '../../../api/auth-api';
import routes from '../../../routes';
import endPoint from '../../../endpoints';
import constant from '../../../const/const';

function* signInApiCall(action) {
  try {
    yield put({ type: signin.SIGNIN_DATA_LOADING, payload: '' });
    const res = yield call(signinAPI, endPoint.LOGIN, action.payload);
    yield put({ type: signin.SIGNIN_DATA_SUCCESS, payload: res });

    // store that in local session for further api calls
    sessionStorage.setItem(constant.TOKEN, res.token);
    sessionStorage.setItem(constant.ID, res.userId);
    sessionStorage.setItem(constant.ROLE, res.role);
    if (res.role === constant.OWNER) {
      action.history.push(routes.OWNER_DASHBOARD);
    } else {
      action.history.push(routes.DASHBOARD);
    }
  } catch (err) {
    yield put({ type: signin.SIGNIN_DATA_ERROR, payload: err });
  }
}

function* watcherSigninSaga() {
  yield takeEvery(signin.SIGNIN_REQUEST, signInApiCall);
}

export default watcherSigninSaga;
