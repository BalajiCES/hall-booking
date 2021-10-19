import intialState from './booking-status-state';
import bookingStatus from './booking-status-action';

function bookingStatusReducer(state = intialState, actions) {
  const { payload } = actions;
  switch (actions.type) {
    case bookingStatus.BOOKING_STATUS_DATA_LOADING:
      return {
        bookingData: {
          loading: true,
          data: {},
          error: false
        }
      };

    case bookingStatus.BOOKING_STATUS_DATA_SUCCESS: {
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

    case bookingStatus.BOOKING_STATUS_DATA_ERROR:
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
export default bookingStatusReducer;
