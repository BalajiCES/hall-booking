import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import bookingStatusAction from '../data/booking-status-action';
import './book-modal.scss';

function BookModal(props) {
  const [date, setDate] = useState('');
  const dispatch = useDispatch();
  const { data = [] } = useSelector(
    (state) => state.bookingStatusReducer.allBookings
  );
  const [bookingList, setBookingList] = useState(data);

  const { show, closeBooking, hallState, bookingSuccess } = props;
  const { hallName, price, capacity, type, id } = hallState;

  if (!show) {
    return null;
  }

  // Blocked Already Booked Dates
  const validDates = (allDate) => {
    const modifiedAllDate = moment(allDate).format('YYYY-MM-DD');
    const validData = bookingList
      .filter((bookedDate) => {
        const { bookingStatus } = bookedDate;
        return bookingStatus === 'Approved';
      })
      .map((ourBookedData) => {
        const { bookedDate } = ourBookedData;
        const modifiedOurDates = moment(bookedDate).format('YYYY-MM-DD');
        return modifiedOurDates;
      });
    if (validData.length === 0) {
      return allDate;
    }
    return validData.find((val) => val !== modifiedAllDate);
  };

  useEffect(() => {
    dispatch({
      type: bookingStatusAction.BOOKINGS_ALL_REQUEST,
      payload: id
    });
  }, []);

  useEffect(() => {
    if (data) {
      setBookingList(data);
    }
  }, [data]);

  return (
    <div
      className="modal"
      onClick={closeBooking}
      role="button"
      tabIndex={0}
      aria-hidden="true"
    >
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        role="button"
        tabIndex={0}
        aria-hidden="true"
      >
        <div className="modal-header">
          <h4 className="modal-title">{hallName}</h4>
        </div>
        <div className="modal-body">
          <p>
            The Price of the hall is
            <span className="bold">{price}</span>
          </p>
          <p>
            The maximum Capacity of the hall is
            <span className="bold">{capacity}</span>
          </p>
          <p>
            This hall is haing{' '}
            <span className="bold hall-type">{`${type} `}</span>
          </p>
          <p>Please select a Date to book a hall</p>
          <div className="date-conatiner">
            <DatePicker
              className="date-picker"
              selected={date}
              onChange={(currDate) => setDate(currDate)}
              minDate={new Date()}
              filterDate={validDates}
              placeholderText="please choose a booking date"
            />
          </div>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="primary"
            onClick={() => bookingSuccess(date)}
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}

BookModal.propTypes = {
  show: PropTypes.bool.isRequired,
  hallState: PropTypes.shape({
    id: PropTypes.string.isRequired,
    hallName: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    capacity: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired
  }).isRequired,
  closeBooking: PropTypes.func.isRequired,
  bookingSuccess: PropTypes.func.isRequired
};

export default BookModal;
