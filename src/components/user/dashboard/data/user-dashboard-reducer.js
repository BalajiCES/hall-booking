import intialState from './user-dashbord-state';
import user from './user-dashboard-actions';

function hallListingReducer(state = intialState, actions) {
  const { payload } = actions;

  switch (actions.type) {
    case user.USER_DASHBOARD_DATA_LOADING:
      return {
        ...state,
        listHalls: {
          loading: true,
          data: {},
          error: false
        }
      };

    case user.USER_DASHBOARD_DATA_SUCCESS:
      return {
        ...state,
        listHalls: {
          loading: false,
          data: payload,
          error: false
        }
      };

    case user.USER_DASHBOARD_DATA_ERROR:
      return {
        ...state,
        listHalls: {
          loading: false,
          data: payload,
          error: true
        }
      };

    case user.USER_BOOKING_SUCCESS:
      return {
        ...state,
        bookingData: payload
      };

    default:
      return state;
  }
}

export default hallListingReducer;
