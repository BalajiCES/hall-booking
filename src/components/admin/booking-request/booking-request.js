import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import bookingRequests from './data/booking-requests-actions';
import Bookings from '../../common/booking/bookings';
import { AuthID } from '../../../util/helper-functions';

function BookingRequest() {
  const [authId, setauthId] = useState(AuthID());
  const dispatch = useDispatch();

  const { loading = false, data = [] } = useSelector(
    (state) => state.bookingRequestReducer.bookingData
  );

  const reListingRequests = () => {
    dispatch({
      type: bookingRequests.BOOKING_REQUEST_REQUEST,
      payload: authId
    });
  };

  useEffect(() => {
    if (authId) {
      dispatch({
        type: bookingRequests.BOOKING_REQUEST_REQUEST,
        payload: authId
      });
    }
  }, [authId]);

  const statusChange = (event, id) => {
    const { target } = event;
    const { value } = target;
    console.log('Value', value, id);
    dispatch({
      type: bookingRequests.BOOKING_STATUS_CHANGED_REQUEST,
      payload: value,
      id,
      reListingRequests
    });
  };

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
                userType="Admin"
                statusChange={statusChange}
              />
            );
          })}
    </div>
  );
}

export default BookingRequest;
