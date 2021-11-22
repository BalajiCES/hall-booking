import { call, takeEvery, put } from 'redux-saga/effects';
import Swal from 'sweetalert2';
import profile from './profile-actions';
import { listSingleUser, updateUser } from '../../../../api/auth-api';
import endPoint from '../../../../endpoints';
import routes from '../../../../routes';
import { getAlertToast } from '../../../../util/helper-functions';
import constant from '../../../../const/const';
import errors from '../../../../const/error';

// Destructuring
const { USER } = endPoint;
const { profileSucess } = errors;
const {
  PROFILE_DATA_LOADING,
  PROFILE_DATA_SUCCESS,
  PROFILE_DATA_ERROR,
  PROFILE_UPDATE_SUCCESS,
  PROFILE_REQUEST,
  PROFILE_UPDATE_REQUEST
} = profile;
const { WARNING, SUCCESS } = constant;

// Create New User
function* profileAPICall(action) {
  const { payload } = action;
  try {
    yield put({ type: PROFILE_DATA_LOADING, payload: '' });
    const res = yield call(listSingleUser, `${USER}/${payload}`);
    yield put({ type: PROFILE_DATA_SUCCESS, payload: res });
  } catch (err) {
    yield put({ type: PROFILE_DATA_ERROR, payload: err });
  }
}

// Update New User
function* updateProfileCall(action) {
  const { payload = {}, id, history, auth } = action;
  const {
    firstName = '',
    lastName = '',
    dob = '',
    age = '',
    gender = ''
  } = payload;
  try {
    const res = yield call(
      updateUser,
      `${USER}/${id}`,
      {
        firstName,
        lastName,
        dob,
        age,
        gender
      },
      auth
    );
    yield put({ type: PROFILE_UPDATE_SUCCESS, payload: res });
    Swal.fire(getAlertToast(SUCCESS, profileSucess));
    history.push(routes.HOME);
  } catch (err) {
    Swal.fire(getAlertToast(WARNING, err));
  }
}

function* watcherProfileSaga() {
  yield takeEvery(PROFILE_REQUEST, profileAPICall);
  yield takeEvery(PROFILE_UPDATE_REQUEST, updateProfileCall);
}

export default watcherProfileSaga;
