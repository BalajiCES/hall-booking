import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import bookingRequests from '../data/booking-requests-actions';
import Bookings from '../../../common/booking/bookings';
import {
  AuthHeader,
  AuthID,
  getConfirm
} from '../../../../util/helper-functions';
import constant from '../../../../const/const';
import CustomLoader from '../../../../util/common';
import { ReactComponent as NotFound } from '../../../../assets/not-found.svg';
import errors from '../../../../const/error';

// Extending Features from dayjS
dayjs.extend(isSameOrAfter);

// Destructuring
const { WARNING } = constant;
const { update } = errors;
const { BOOKING_REQUEST_REQUEST, BOOKING_STATUS_CHANGED_REQUEST } =
  bookingRequests;

// BookingRequest component
function BookingRequest() {
  const [authId] = useState(AuthID());
  const dispatch = useDispatch();

  const { loading = false, data = [] } = useSelector(
    (state) => state.bookingRequestReducer.bookingData
  );

  const reListingRequests = () => {
    dispatch({
      type: BOOKING_REQUEST_REQUEST,
      payload: authId
    });
  };

  const statusChange = (event, id) => {
    const { target } = event;
    const { value } = target;
    Swal.fire(getConfirm(WARNING, update)).then((result) => {
      if (result.value) {
        dispatch({
          type: BOOKING_STATUS_CHANGED_REQUEST,
          payload: value,
          id,
          auth: AuthHeader(),
          reListingRequests
        });
      }
    });
  };

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
      <h2 className="hall-title">ALL BOOKING REQUEST</h2>
      <center>{loading && <CustomLoader loading={loading} />}</center>
      {!loading && data ? (
        data
          .filter((bookingData) => {
            const { bookedDate } = bookingData;
            return dayjs(bookedDate).isSameOrAfter(
              dayjs(new Date().toDateString())
            );
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
              // custom Bookings Component
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
