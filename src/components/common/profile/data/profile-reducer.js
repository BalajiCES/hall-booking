import intialState from './profile-state';
import profile from './profile-actions';

function profileReducer(state = intialState, actions) {
  const { payload } = actions;
  switch (actions.type) {
    case profile.PROFILE_DATA_LOADING:
      return {
        ...state,
        profileData: {
          loading: true,
          formInitialValues: {},
          error: false
        }
      };

    case profile.PROFILE_DATA_SUCCESS: {
      const { data = {} } = payload;
      const { user = {} } = data;
      console.log('User', user);
      const {
        firstName = '',
        lastName = '',
        email = '',
        gender = '',
        dob = '',
        age = '',
        role = '',
        password = '',
        passwordConfirm = ''
      } = user;
      return {
        ...state,
        profileData: {
          loading: false,
          formInitialValues: {
            firstName,
            lastName,
            email,
            gender,
            dob,
            age,
            role,
            password,
            passwordConfirm
          },
          error: false
        }
      };
    }

    case profile.PROFILE_UPDATE_SUCCESS: {
      const { data = {} } = payload;
      const { user = {} } = data;
      console.log('User', user);
      const {
        firstName = '',
        lastName = '',
        email = '',
        gender = '',
        dob = '',
        age = '',
        role = '',
        password = '',
        passwordConfirm = ''
      } = user;
      return {
        ...state,
        profileData: {
          loading: false,
          formInitialValues: {
            firstName,
            lastName,
            email,
            gender,
            dob,
            age,
            role,
            password,
            passwordConfirm
          },
          error: false
        }
      };
    }

    case profile.PROFILE_DATA_ERROR:
      return {
        ...state,
        profileData: {
          loading: false,
          formInitialValues: payload,
          error: true
        }
      };

    case profile.PROFILE_DATA_RESET:
      return {
        profileData: {
          loading: false,
          formInitialValues: {
            firstName: '',
            lastName: '',
            email: '',
            gender: '',
            dob: '',
            age: '',
            role: '',
            password: '',
            passwordConfirm: ''
          },
          error: false
        }
      };

    default:
      return state;
  }
}

export default profileReducer;
