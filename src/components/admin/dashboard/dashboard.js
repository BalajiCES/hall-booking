import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { REGISTER_HALL, BOOKING_REQUEST } from '../../../routes';
import register from '../register-hall/data/register-actions';
import { AuthID } from '../../../util/helper-functions';
import './dashboard.scss';

function AdminDashboard() {
  const [id] = useState(AuthID());
  const dispatch = useDispatch();
  const { data = {}, loading = false } = useSelector(
    (state) => state.registerReducer.listHalls
  );
  const { hall = [] } = data;
  console.log('Register', data);

  useEffect(() => {
    dispatch({
      type: register.LIST_REGISTER_ID_REQUEST,
      payload: id
    });
  }, []);

  return (
    <div>
      <nav>
        <ul>
          <Link to={REGISTER_HALL} className="link">
            <li>Register Hall</li>
          </Link>
          <Link to={`/profile/${id}`} className="link">
            <li>Profile</li>
          </Link>
          <Link to={BOOKING_REQUEST} className="link">
            <li href="/">Booking Request</li>
          </Link>
          <li href="/">Booking History</li>
        </ul>
      </nav>
      <h2 className="hall-title">All Registered Halls</h2>
      {!loading &&
        hall.map((hallData) => {
          const { _id, hallName, capacity, price } = hallData;
          return (
            <div key={_id} className="hall-tile">
              <h3 className="title">{hallName}</h3>
              <h3 className="price">&#8377; {price}</h3>
              <h3 className="capacity">capacity : {capacity}</h3>
              <div className="button-container">
                <button type="button">Booking Request</button>
                <button type="button">Booking History</button>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default AdminDashboard;
