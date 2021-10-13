import intialState from './profile-state';
import profile from './profile-actions';

function profileReducer(state = intialState, actions) {
  const { payload } = actions;

  switch (actions.type) {
    case profile.PROFILE_DATA_LOADING:
      return {
        profileData: {
          loading: true,
          data: {},
          error: false
        }
      };

    case profile.PROFILE_DATA_SUCCESS:
      return {
        profileData: {
          loading: false,
          data: payload,
          error: false
        }
      };

    case profile.PROFILE_DATA_ERROR:
      return {
        profileData: {
          loading: false,
          data: payload,
          error: true
        }
      };

    default:
      return state;
  }
}

export default profileReducer;
