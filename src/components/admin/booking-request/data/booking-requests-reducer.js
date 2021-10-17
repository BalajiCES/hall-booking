import intialState from './booking-requests-state';
import bookingRequests from './booking-requests-actions';

function bookingRequestReducer(state = intialState, actions) {
  const { payload } = actions;
  switch (actions.type) {
    case bookingRequests.BOOKING_REQUEST_DATA_LOADING:
      return {
        bookingData: {
          loading: true,
          data: {},
          error: false
        }
      };

    case bookingRequests.BOOKING_REQUEST_DATA_SUCCESS: {
      const { data = {} } = payload;
      const { bookings = [] } = data;

      return {
        bookingData: {
          loading: false,
          data: bookings,
          error: false
        }
      };
    }

    case bookingRequests.BOOKING_REQUEST_DATA_ERROR:
      return {
        bookingData: {
          loading: false,
          data: payload,
          error: true
        }
      };

    default:
      return state;
  }
}
export default bookingRequestReducer;
