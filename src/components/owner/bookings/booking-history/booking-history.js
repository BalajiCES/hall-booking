import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import bookingRequests from '../data/booking-requests-actions';
import Bookings from '../../../common/booking/bookings';
import { AuthID } from '../../../../util/helper-functions';

function OwnerBookingHistory() {
  const [authId, setauthId] = useState(AuthID());
  const dispatch = useDispatch();

  const { loading = false, data = [] } = useSelector(
    (state) => state.bookingRequestReducer.bookingData
  );

  useEffect(() => {
    if (authId) {
      console.log('AuthID', authId, typeof authId);
      dispatch({
        type: bookingRequests.BOOKING_REQUEST_REQUEST,
        payload: authId
      });
    }
  }, [authId]);

  console.log('Data', data);

  return (
    <div>
      {!loading &&
        data.map((bookingData) => {
          const {
            _id,
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
              key={_id}
              bookingId={_id}
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

export default OwnerBookingHistory;
