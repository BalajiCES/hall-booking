import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import user from './data/user-dashboard-actions';
import { AuthID } from '../../../util/helper-functions';
import { BOOKING_STATUS } from '../../../routes';

function UserDashBaord() {
  const [id] = useState(AuthID());
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
    console.log('Id', hallId);
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
      <nav>
        <ul>
          <Link to={`/profile/${id}`} className="link">
            <li>Profile</li>
          </Link>
          <Link to={BOOKING_STATUS} className="link">
            <li>Booking Status</li>
          </Link>
          <li href="/">Booking History</li>
        </ul>
      </nav>
      {!loading &&
        halls.map((list) => {
          const { _id, hallName, capacity, price, status } = list;
          return (
            <div key={_id} className="hall-tile">
              <h3 className="title">{hallName}</h3>
              <h3 className="price">&#8377; {price}</h3>
              <h3 className="capacity">capacity : {capacity}</h3>
              <p>{status}</p>
              <div className="button-container">
                {status !== 'Booked' && status !== 'Selected' && (
                  <button type="button" onClick={() => intiateBooking(_id)}>
                    Book Now
                  </button>
                )}
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default UserDashBaord;
