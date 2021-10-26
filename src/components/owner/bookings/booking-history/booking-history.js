import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import bookingRequests from '../data/booking-requests-actions';
import Bookings from '../../../common/booking/bookings';
import { AuthID } from '../../../../util/helper-functions';
import CustomLoader from '../../../../util/common';
import { ReactComponent as NotFound } from '../../../../assets/not-found.svg';
import './booking-history.scss';

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
      <h2 className="hall-title">ALL BOOKING HISTORY</h2>
      <center>{loading && <CustomLoader loading={loading} />}</center>

      {!loading && Array(data) ? (
        data.map((bookingData) => {
          const {
            _id,
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
        })
      ) : (
        <NotFound style={{ height: '300px', width: '100%' }} />
      )}
    </div>
  );
}

export default OwnerBookingHistory;
