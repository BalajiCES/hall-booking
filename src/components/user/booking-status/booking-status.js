import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Bookings from '../../common/booking/bookings';
import bookingStatus from './data/booking-status-action';
import { AuthID } from '../../../util/helper-functions';

function BookingStatus() {
  const [authId, setauthId] = useState(AuthID());
  const dispatch = useDispatch();

  const { loading = false, data = [] } = useSelector(
    (state) => state.bookingStatusReducer.bookingData
  );
  console.log('Data Status ', data, typeof data, Array.isArray(data));

  useEffect(() => {
    dispatch({
      type: bookingStatus.BOOKING_STATUS_REQUEST,
      payload: authId
    });
  }, []);

  return (
    <div>
      {!loading &&
        data
          .filter((bookingData) => {
            const { bookingStatus: status } = bookingData;
            return status === 'Pending';
          })
          .map((bookingData) => {
            const {
              bookedDate,
              bookingStatus: status,
              hallId,
              userId
            } = bookingData;
            const { hallName, onwedBy } = hallId;
            const { firstName } = onwedBy;
            const { firstName: userFirstName } = userId;
            return (
              <Bookings
                hallName={hallName}
                ownerName={firstName}
                userName={userFirstName}
                date={bookedDate}
                status={status}
                userType="User"
              />
            );
          })}
    </div>
  );
}

export default BookingStatus;
