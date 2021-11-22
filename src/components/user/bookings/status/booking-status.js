import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import Bookings from '../../../common/booking/bookings';
import bookingStatus from '../data/booking-status-action';
import { AuthID, AuthHeader } from '../../../../util/helper-functions';
import { ReactComponent as NotFound } from '../../../../assets/not-found.svg';
import CustomLoader from '../../../../util/common';

// Extending DayJS
dayjs.extend(isSameOrAfter);

// Destructuring
const { BOOKING_STATUS_REQUEST, BOOKING_DELETE_REQUEST } = bookingStatus;

// Booking Status component
function BookingStatus() {
  const [authId] = useState(AuthID());
  const [authHeader] = useState(AuthHeader());
  const dispatch = useDispatch();

  const { loading = false, data = [] } = useSelector(
    (state) => state.bookingStatusReducer.bookingData
  );

  const cancelBooking = (bookingId) => {
    dispatch({
      type: BOOKING_DELETE_REQUEST,
      payload: bookingId,
      auth: authHeader
    });
    dispatch({
      type: BOOKING_STATUS_REQUEST,
      payload: authId
    });
  };

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
            const { startDate } = bookingData;
            return dayjs(startDate).isSameOrAfter(
              dayjs(new Date().toDateString())
            );
          })
          .map((bookingData) => {
            const {
              _id,
              startDate,
              endDate,
              bookingStatus: status,
              hallId,
              userId,
              createdAt
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
                startDate={startDate}
                created={createdAt}
                endDate={endDate}
                status={status}
                id={_id}
                userType="User"
                cancelBooking={cancelBooking}
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
