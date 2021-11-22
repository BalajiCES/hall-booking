import intialState from './admin-dashboard-state';
import adminRequests from './admin-dashboard-actions';

function adminRequestReducer(state = intialState, actions) {
  const { payload } = actions;
  switch (actions.type) {
    case adminRequests.ADMIN_REQUEST_DATA_LOADING:
      return {
        adminData: {
          loading: true,
          data: {},
          error: false
        }
      };

    case adminRequests.ADMIN_REQUEST_DATA_SUCCESS: {
      const { data = {} } = payload;
      // console.log('Data', data);
      const { halls = [] } = data;
      return {
        adminData: {
          loading: false,
          data: halls,
          error: false
        }
      };
    }

    case adminRequests.ADMIN_HALL_REQUEST_DATA_SUCCESS: {
      const { data = {} } = payload;
      const { users = [] } = data;
      return {
        adminData: {
          loading: false,
          data: users,
          error: false
        }
      };
    }

    case adminRequests.ADMIN_REQUEST_DATA_ERROR:
      return {
        adminData: {
          loading: false,
          data: payload,
          error: true
        }
      };

    default:
      return state;
  }
}
export default adminRequestReducer;
