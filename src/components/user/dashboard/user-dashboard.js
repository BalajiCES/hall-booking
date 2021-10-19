import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import user from './data/user-dashboard-actions';
import { AuthID } from '../../../util/helper-functions';
import HallCard from '../../common/cards/card';

function UserDashBaord() {
  const dispatch = useDispatch();

  const { data: hallData = {}, loading = false } = useSelector(
    (state) => state.hallListingReducer.listHalls
  );

  const { data = {} } = hallData;
  const { halls = [] } = data;

  const bookingSuccess = () =>
    dispatch({
      type: user.USER_DASHBOARD_REQUEST
    });

  const intiateBooking = (hallId) => {
    dispatch({
      type: user.USER_BOOKING_REQUEST,
      payload: {
        userId: AuthID(),
        hallId,
        bookedDate: Date.now()
      },
      bookingSuccess
    });
  };

  useEffect(() => {
    dispatch({
      type: user.USER_DASHBOARD_REQUEST
    });
  }, []);

  return (
    <div>
      <h2 className="hall-title">ALL HALLS</h2>
      {!loading &&
        halls.map((list) => {
          const { _id, hallName, capacity, price, status } = list;
          return (
            <HallCard
              key={_id}
              id={_id}
              hallName={hallName}
              capacity={capacity}
              price={price}
              status={status}
              intiateBooking={intiateBooking}
              user="User"
            />
          );
        })}
    </div>
  );
}

export default UserDashBaord;
