import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import {
  eachHourOfInterval,
  isSameDay,
  isWithinInterval,
  isSameSecond,
  setMinutes,
  setHours,
  differenceInHours,
  millisecondsToHours,
  setSeconds,
  setMilliseconds
} from 'date-fns';
import DatePicker from 'react-datepicker';
import bookingStatusAction from '../data/booking-status-action';
import './book-modal.scss';
import constant from '../../../../const/const';
import { getAlertToast } from '../../../../util/helper-functions';
import errors from '../../../../const/error';
// Destructuring
const { APPROVED, SUCCESS } = constant;
const { validBooking, bookedError } = errors;
const { BOOKINGS_ALL_REQUEST } = bookingStatusAction;

// Booking Model Component
function BookModal(props) {
  const { show, closeBooking, hallState, bookingSuccess } = props;
  const { hallName, price, capacity, type, id } = hallState;
  const [startDate, setStartDate] = useState(
    setMilliseconds(
      setSeconds(
        setHours(setMinutes(new Date(), 0), new Date().getHours() + 1),
        0
      ),
      0
    )
  );
  const [endDate, setEndDate] = useState();
  const [paymentAmount, setPaymentAmount] = useState(0);
  const dispatch = useDispatch();
  const { data = [] } = useSelector(
    (state) => state.bookingStatusReducer.allBookings
  );
  const [bookingList, setBookingList] = useState(data);

  if (!show) {
    return null;
  }

  // Create variable for last day of next month
  const newDate = new Date();
  const lastDay = new Date(newDate.getFullYear(), newDate.getMonth() + 2, 0);

  // Return Array of dates in hours in the booked intervals
  const validHours = bookingList
    .filter((bookedDate) => {
      const { bookingStatus } = bookedDate;
      return bookingStatus === APPROVED;
    })
    .map((ourBookedData) => {
      const { startDate: sDate, endDate: eDate } = ourBookedData;
      return eachHourOfInterval({
        start: new Date(sDate),
        end: new Date(eDate)
      });
    });

  // Flat the array of arrays
  const allHoursRange = validHours.flat(1);

  // exclude start date timings
  const excludeChoosedStartDate = allHoursRange.filter((date) =>
    isSameDay(date, startDate)
  );

  // exclude end date timings
  const excludeChoosedEndDate = allHoursRange.filter((date) =>
    isSameDay(date, endDate)
  );

  // check whether the booking is valid or not
  const validateBookings = (sDate, eDate) => {
    // check whether the two dates are same
    if (isSameSecond(sDate, eDate)) {
      Swal.fire(getAlertToast(SUCCESS, bookedError));
      // check starting date is greater than ending date
    } else if (sDate > eDate) {
      Swal.fire(getAlertToast(SUCCESS, validBooking));
    } else {
      // check the current booking date is not overlapping with other booked dates
      const overlap = allHoursRange.map((date) =>
        isWithinInterval(date, { start: sDate, end: eDate })
      );
      const validateChecking = overlap.some((val) => val === true);
      // if overlap warn the user
      if (validateChecking) {
        Swal.fire(getAlertToast(SUCCESS, validBooking));
        //  else go eith booking
      } else {
        bookingSuccess(sDate, eDate, paymentAmount);
      }
    }
  };

  useEffect(() => {
    dispatch({
      type: BOOKINGS_ALL_REQUEST,
      payload: id
    });
  }, []);

  useEffect(() => {
    if (data) {
      setBookingList(data);
    }
  }, [data]);

  useEffect(() => {
    const payable =
      (price / 24) *
      millisecondsToHours(
        new Date(endDate).getTime() - new Date(startDate).getTime()
      );
    setPaymentAmount(parseFloat(payable || 0).toFixed(2));
  }, [startDate, endDate]);

  console.log('Res', paymentAmount);

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
            The Price of the hall is &#x20b9;
            <span className="bold">{price}</span>
          </p>
          <p>
            The maximum Capacity of the hall is
            <span className="bold">{capacity}</span>
          </p>
          <p>
            This hall is having{' '}
            <span className="bold hall-type">{`${type} `}</span>
          </p>
          <p>Please select a Date to book a hall</p>
          <div className="date-conatiner">
            <div className="starting-container">
              <DatePicker
                selected={startDate}
                startDate={startDate}
                endDate={endDate}
                className="date-picker"
                onChange={(currDate) => setStartDate(currDate)}
                minDate={new Date()}
                maxDate={lastDay}
                minTime={
                  isSameDay(startDate, new Date())
                    ? new Date()
                    : setHours(setMinutes(new Date(), 0), 0)
                }
                maxTime={setHours(setMinutes(new Date(), 0), 23)}
                showTimeSelect
                excludeTimes={excludeChoosedStartDate}
                timeIntervals={60}
                placeholderText="please choose a starting date"
                dateFormat="MMMM d, yyyy h:mm aa"
              />
            </div>
            <div className="ending-container">
              <DatePicker
                selected={endDate}
                startDate={startDate}
                endDate={endDate}
                className="date-picker"
                onChange={(currDate) => setEndDate(currDate)}
                minDate={startDate}
                maxDate={lastDay}
                minTime={
                  isSameDay(endDate, new Date())
                    ? new Date()
                    : setHours(setMinutes(new Date(), 0), 0)
                }
                maxTime={setHours(setMinutes(new Date(), 0), 23)}
                showTimeSelect
                excludeTimes={excludeChoosedEndDate}
                timeIntervals={60}
                placeholderText="please choose a Ending date"
                dateFormat="MMMM d, yyyy h:mm aa"
              />
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <h4 className="payment-amount">
            Total Amount is : &#x20b9;
            {paymentAmount}
          </h4>
          <button
            type="button"
            className="primary payment-button"
            onClick={() => validateBookings(startDate, endDate)}
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
