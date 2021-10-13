import { combineReducers } from 'redux';
import signinReducer from '../components/signin/data/signin-reducer';
import signupReducer from '../components/signup/data/signup-reducer';
import registerReducer from '../components/admin/register-hall/data/register-reducer';
import profileReducer from '../components/common/profile/data/profile-reducer';

export default combineReducers({
  signinReducer,
  signupReducer,
  registerReducer,
  profileReducer
});
