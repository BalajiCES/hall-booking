import { put, takeEvery, call } from 'redux-saga/effects';
import signup from './signup-actions';
import { signupAPI } from '../../../api/auth-api';
import endPoint from '../../../endpoints';
import routes from '../../../routes';

// worker saga will be fired on
function* signupAPICall(action) {
  try {
    yield put({ type: signup.SIGNUP_DATA_LOADING, payload: '' });
    const res = yield call(
      signupAPI,
      // proxy
      endPoint.SIGNUP,
      action.payload
    );
    yield put({
      type: signup.SIGNUP_DATA_SUCCESS,
      payload: res
    });
    // make callbacks
    action.history.push(routes.HOME);
  } catch (error) {
    const data = JSON.parse(error.message);
    yield put({
      type: signup.SIGNUP_DATA_ERROR,
      payload: data
    });
  }
}

function* watcherSignUp() {
  yield takeEvery(signup.SIGNUP_REQUEST, signupAPICall);
}

export default watcherSignUp;
