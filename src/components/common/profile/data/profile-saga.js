import { call, takeEvery, put } from 'redux-saga/effects';
import profile from './profile-actions';
import { listSingleUser, updateUser } from '../../../../api/auth-api';

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

function* updateProfileCall(action) {
  const {
    firstName = '',
    lastName = '',
    dob = '',
    age = '',
    gender = ''
  } = action.payload;
  try {
    const res = yield call(
      updateUser,
      `http://localhost:5000/user/${action.id}`,
      {
        firstName,
        lastName,
        dob,
        age,
        gender
      }
    );
    console.log('Res', res);
    yield put({ type: profile.PROFILE_UPDATE_SUCCESS, payload: res });
  } catch (err) {
    console.log(err);
  }
}

function* watcherProfileSaga() {
  yield takeEvery(profile.PROFILE_REQUEST, profileAPICall);
  yield takeEvery(profile.PROFILE_UPDATE_REQUEST, updateProfileCall);
}

export default watcherProfileSaga;
