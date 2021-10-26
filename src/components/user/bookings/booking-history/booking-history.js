import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import bookingStatus from '../data/booking-status-action';
import Bookings from '../../../common/booking/bookings';
import { AuthID } from '../../../../util/helper-functions';
import { ReactComponent as NotFound } from '../../../../assets/not-found.svg';
import CustomLoader from '../../../../util/common';

function BookingHistory() {
  const [authId, setauthId] = useState(AuthID());
  const dispatch = useDispatch();

  const { loading = false, data = [] } = useSelector(
    (state) => state.bookingStatusReducer.bookingData
  );
  // console.log('Data Status ', data, typeof data, Array.isArray(data));

  useEffect(() => {
    dispatch({
      type: bookingStatus.BOOKING_STATUS_REQUEST,
      payload: authId
    });
  }, []);

  return (
    <div>
      <h2 className="hall-title">All BOOKING HISTORY</h2>
      <center>{loading && <CustomLoader loading={loading} />}</center>
      {!loading && Array(data) ? (
        data.map((bookingData) => {
          const {
            bookedDate,
            bookingStatus: status,
            hallId,
            userId
          } = bookingData;
          const { hallName, ownedBy } = hallId;
          const { firstName } = ownedBy;
          const { firstName: userFirstName } = userId;
          return (
            <Bookings
              key={hallId}
              hallName={hallName}
              ownerName={firstName}
              userName={userFirstName}
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
