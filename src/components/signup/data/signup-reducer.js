import signup from './signup-actions';
import intialState from './signup-state';

function signupReducer(state = intialState, actions) {
  const { payload } = actions;

  switch (actions.type) {
    case signup.SIGNUP_DATA_LOADING:
      return {
        signupData: {
          loading: true,
          data: {},
          error: false
        }
      };

    case signup.SIGNUP_DATA_SUCCESS:
      return {
        signupData: {
          loading: false,
          data: payload,
          error: false
        }
      };

    case signup.SIGNUP_DATA_ERROR:
      return {
        signupData: {
          loading: false,
          data: payload,
          error: true
        }
      };

    default:
      return state;
  }
}

export default signupReducer;
