import intialState from './register-state';
import register from './register-actions';

function registerReducer(state = intialState, actions) {
  const { payload } = actions;

  switch (actions.type) {
    case register.REGISTER_DATA_LOADING:
      return {
        ...state,
        registerData: {
          loading: true,
          data: {},
          error: false
        }
      };

    case register.REGISTER_DATA_SUCCESS: {
      const { data = {} } = payload;
      const { hall = {} } = data;
      const { hallName, price, type, event, custom, capacity, phoneNumber } =
        hall;
      return {
        ...state,
        loading: true,
        registerData: {
          loading: false,
          data: {
            hallName,
            price,
            capacity,
            phoneNumber,
            event,
            type,
            custom,
            onwedBy: ''
          },
          error: false
        }
      };
    }

    case register.REGISTER_RESET_DATA:
      return {
        ...state,
        registerData: {
          loading: false,
          data: {},
          error: false
        }
      };

    case register.REGISTER_DATA_ERROR:
      return {
        ...state,
        registerData: {
          loading: false,
          data: payload,
          error: true
        }
      };

    case register.LIST_REGISTER_ID_LOADING:
      return {
        ...state,
        listHalls: {
          loading: true,
          data: {},
          error: false
        }
      };

    case register.LIST_REGISTER_ID_SUCCESS:
      return {
        ...state,
        listHalls: {
          loading: false,
          data: payload,
          error: false
        }
      };

    case register.LIST_REGISTER_ID_ERROR:
      return {
        ...state,
        listHalls: {
          loading: false,
          data: payload,
          error: true
        }
      };
    default:
      return state;
  }
}

export default registerReducer;
