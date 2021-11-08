import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import Bookings from '../../../common/booking/bookings';
import bookingStatus from '../data/booking-status-action';
import { AuthID } from '../../../../util/helper-functions';
import { ReactComponent as NotFound } from '../../../../assets/not-found.svg';
import CustomLoader from '../../../../util/common';

// Extending DayJS
dayjs.extend(isSameOrAfter);

// Destructuring
const { BOOKING_STATUS_REQUEST } = bookingStatus;

// Booking Status component
function BookingStatus() {
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
      <h2 className="hall-title">All BOOKING STATUS</h2>
      <center>{loading && <CustomLoader loading={loading} />}</center>
      {!loading && data ? (
        data
          .filter((bookingData) => {
            const { bookedDate } = bookingData;
            return dayjs(bookedDate).isSameOrAfter(
              dayjs(new Date().toDateString())
            );
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

export default BookingStatus;
