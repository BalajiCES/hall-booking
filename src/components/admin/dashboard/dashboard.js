import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import register from '../register-hall/data/register-actions';
import { AuthID } from '../../../util/helper-functions';
import './dashboard.scss';
import HallCard from '../../common/cards/card';

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
      <h2 className="hall-title">All Registered Halls</h2>
      {!loading &&
        hall.map((hallData) => {
          const { _id, hallName, capacity, price } = hallData;
          return (
            <HallCard
              key={_id}
              hallName={hallName}
              capacity={capacity}
              price={price}
            />
          );
        })}
    </div>
  );
}

export default AdminDashboard;
