import intialState from './signin-state';
import signin from './signin-actions';

function signinReducer(state = intialState, actions) {
  const { payload } = actions;

  switch (actions.type) {
    case signin.SIGNIN_DATA_LOADING:
      return {
        signinData: {
          loading: true,
          data: {},
          error: false
        }
      };

    case signin.SIGNIN_DATA_SUCCESS:
      return {
        signinData: {
          loading: false,
          data: payload,
          error: false
        }
      };

    case signin.SIGNIN_DATA_ERROR:
      return {
        signinData: {
          loading: false,
          data: payload,
          error: true
        }
      };

    default:
      return state;
  }
}

export default signinReducer;
