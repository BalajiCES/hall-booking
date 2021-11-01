import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import moment from 'moment';
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
import errors from '../../../../const/error';

function BookingRequest() {
  const [authId] = useState(AuthID());
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

  const statusChange = (event, id) => {
    const { target } = event;
    const { value } = target;
    Swal.fire(getConfirm(constant.WARNING, errors.update)).then((result) => {
      if (result.value) {
        dispatch({
          type: bookingRequests.BOOKING_STATUS_CHANGED_REQUEST,
          payload: value,
          id,
          reListingRequests
        });
        Swal.fire(getAlertToast(constant.SUCCESS, errors.sucessUpdate));
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
      {!loading && data ? (
        data
          .filter((bookingData) => {
            const { bookedDate } = bookingData;
            return moment(bookedDate).isSameOrAfter(new Date().toDateString());
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
            const { firstName, lastName } = ownedBy;
            const { firstName: userFirstName, lastName: userLastName } = userId;
            return (
              <Bookings
                key={_id}
                bookingId={_id}
                hallName={hallName}
                ownerName={firstName + lastName}
                userName={userFirstName + userLastName}
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
