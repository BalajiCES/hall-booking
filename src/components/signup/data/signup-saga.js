import { put, takeEvery, call } from 'redux-saga/effects';
import signup from './signup-actions';
import { signupAPI } from '../../../api/auth-api';

// worker saga will be fired on
function* signupAPICall(action) {
  try {
    yield put({ type: signup.SIGNUP_DATA_LOADING, payload: '' });
    const res = yield call(
      signupAPI,
      // proxy
      'http://localhost:5000/user/signup',
      action.payload
    );
    console.log('Response', res);
    yield put({
      type: signup.SIGNUP_DATA_SUCCESS,
      payload: res
    });
    // make callbacks
    action.history.push('/');
  } catch (error) {
    const data = JSON.parse(error.message);
    console.log('Error', data);
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
