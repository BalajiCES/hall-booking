import { call, takeEvery, put } from 'redux-saga/effects';
import profile from './profile-actions';
import { listSingleUser } from '../../../../api/auth-api';

function* profileAPICall(action) {
  try {
    yield put({ type: profile.PROFILE_DATA_LOADING, payload: '' });

    const res = yield call(
      listSingleUser,
      `http://localhost:5000/user/${action.payload}`
    );
    console.log('Res', res);
    yield put({ type: profile.PROFILE_DATA_SUCCESS, payload: res });
  } catch (err) {
    console.log(err);
    yield put({ type: profile.PROFILE_DATA_ERROR, payload: err });
  }
}

function* watcherProfileSaga() {
  yield takeEvery(profile.PROFILE_REQUEST, profileAPICall);
}

export default watcherProfileSaga;
