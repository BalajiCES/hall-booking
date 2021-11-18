import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import bookingRequests from '../data/booking-requests-actions';
import Bookings from '../../../common/booking/bookings';
import { AuthID } from '../../../../util/helper-functions';
import CustomLoader from '../../../../util/common';
import { ReactComponent as NotFound } from '../../../../assets/not-found.svg';

// Destructuring
const { BOOKING_REQUEST_REQUEST } = bookingRequests;

// Booking History Component
function OwnerBookingHistory() {
  const [authId] = useState(AuthID());
  const dispatch = useDispatch();

  const { loading = false, data = [] } = useSelector(
    (state) => state.bookingRequestReducer.bookingData
  );

  useEffect(() => {
    if (authId) {
      dispatch({
        type: BOOKING_REQUEST_REQUEST,
        payload: authId
      });
    }
  }, [authId]);

  return (
    <div>
      <h2 className="hall-title">ALL BOOKING HISTORY</h2>
      <center>{loading && <CustomLoader loading={loading} />}</center>

      {!loading && data ? (
        data
          .filter((bookingData) => {
            const { startDate } = bookingData;
            return dayjs(startDate).isBefore(dayjs(new Date().toDateString()));
          })
          .map((bookingData) => {
            const {
              _id,
              startDate,
              endDate,
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
                key={_id}
                bookingId={_id}
                hallName={hallName}
                ownerName={firstName + lastName}
                userName={userFirstName + userLastName}
                startDate={startDate}
                endDate={endDate}
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

export default OwnerBookingHistory;
