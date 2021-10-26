import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import bookingRequests from '../data/booking-requests-actions';
import Bookings from '../../../common/booking/bookings';
import {
  AuthID,
  getAlertToast,
  getConfirm
} from '../../../../util/helper-functions';
import constant from '../../../../const/const';
import CustomLoader from '../../../../util/common';
import { ReactComponent as NotFound } from '../../../../assets/not-found.svg';

function BookingRequest() {
  const [authId, setauthId] = useState(AuthID());
  const dispatch = useDispatch();

  const {
    loading = false,
    data = [],
    error = false
  } = useSelector((state) => state.bookingRequestReducer.bookingData);
  console.log('Erros', error);

  const reListingRequests = () => {
    dispatch({
      type: bookingRequests.BOOKING_REQUEST_REQUEST,
      payload: authId
    });
  };

  const statusChange = (event, id) => {
    const { target } = event;
    const { value } = target;
    Swal.fire(
      getConfirm('warning', 'Are you sure do you want to update the status?')
    ).then((result) => {
      if (result.value) {
        dispatch({
          type: bookingRequests.BOOKING_STATUS_CHANGED_REQUEST,
          payload: value,
          id,
          reListingRequests
        });
        Swal.fire(getAlertToast('success', 'status is succesfully updated'));
      }
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

  return (
    <div>
      <h2 className="hall-title">ALL BOOKING REQUEST</h2>
      <center>{loading && <CustomLoader loading={loading} />}</center>
      {!loading && Array(data) ? (
        data
          .filter((bookingData) => {
            const { bookingStatus: status } = bookingData;
            return status === constant.PENDING;
          })
          .map((bookingData) => {
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
                userType="Owner"
                statusChange={statusChange}
              />
            );
          })
      ) : (
        <>
          <NotFound style={{ height: '300px', width: '100%' }} />
        </>
      )}
    </div>
  );
}

export default BookingRequest;
