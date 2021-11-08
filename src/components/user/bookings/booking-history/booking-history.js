import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import bookingStatus from '../data/booking-status-action';
import Bookings from '../../../common/booking/bookings';
import { AuthID } from '../../../../util/helper-functions';
import { ReactComponent as NotFound } from '../../../../assets/not-found.svg';
import CustomLoader from '../../../../util/common';

// Destructuring
const { BOOKING_STATUS_REQUEST } = bookingStatus;

// Booking History Component
function BookingHistory() {
  const [authId] = useState(AuthID());
  const dispatch = useDispatch();

  const { loading = false, data = [] } = useSelector(
    (state) => state.bookingStatusReducer.bookingData
  );

  useEffect(() => {
    dispatch({
      type: BOOKING_STATUS_REQUEST,
      payload: authId
    });
  }, []);

  return (
    <div>
      <h2 className="hall-title">All BOOKING HISTORY</h2>
      <center>{loading && <CustomLoader loading={loading} />}</center>
      {!loading && data ? (
        data
          .filter((bookingData) => {
            const { bookedDate } = bookingData;
            return dayjs(bookedDate).isBefore(dayjs(new Date().toDateString()));
          })
          .map((bookingData) => {
            const {
              bookedDate,
              bookingStatus: status,
              hallId,
              userId
            } = bookingData;
            const { hallName, ownedBy } = hallId;
            const { firstName, lastName } = ownedBy;
            const { firstName: userFirstName, lastName: userLastName } = userId;
            return (
              // custom Bookings Component
              <Bookings
                key={hallId}
                hallName={hallName}
                ownerName={firstName + lastName}
                userName={userFirstName + userLastName}
                date={bookedDate}
                status={status}
                userType="User"
              />
            );
          })
      ) : (
        <NotFound style={{ height: '300px', width: '100%' }} />
      )}
    </div>
  );
}

export default BookingHistory;
