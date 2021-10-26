import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Bookings from '../../../common/booking/bookings';
import bookingStatus from '../data/booking-status-action';
import { AuthID } from '../../../../util/helper-functions';
import constant from '../../../../const/const';
import { ReactComponent as NotFound } from '../../../../assets/not-found.svg';
import CustomLoader from '../../../../util/common';

function BookingStatus() {
  const [authId, setauthId] = useState(AuthID());
  const dispatch = useDispatch();

  const { loading = false, data = [] } = useSelector(
    (state) => state.bookingStatusReducer.bookingData
  );
  console.log('Data Status ', data);

  useEffect(() => {
    dispatch({
      type: bookingStatus.BOOKING_STATUS_REQUEST,
      payload: authId
    });
  }, []);

  return (
    <div>
      <h2 className="hall-title">All BOOKING STATUS</h2>
      <center>{loading && <CustomLoader loading={loading} />}</center>
      {!loading && Array(data) ? (
        data
          .filter((bookingData) => {
            const { bookingStatus: status } = bookingData;
            return status === constant.PENDING;
          })
          .map((bookingData) => {
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

export default BookingStatus;
