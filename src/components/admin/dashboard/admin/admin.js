import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomLoader from '../../../../util/common';
import HallCard from '../../../common/cards/card';
import adminRequest from '../data/admin-dashboard-actions';
import './admin.scss';

function Admin() {
  const dispatch = useDispatch();
  const { data = [], loading = false } = useSelector(
    (state) => state.adminRequestReducer.adminData
  );

  useEffect(() => {
    dispatch({
      type: adminRequest.ADMIN_HALL_REQUEST_REQUEST
    });
  }, []);

  return (
    <div>
      <h2 className="hall-title">ALL REGISTERED HALLS</h2>
      <h2 className="halls-count">
        Total Halls Registered : {data.length || 0}
      </h2>
      <center>{loading && <CustomLoader loading={loading} />}</center>
      {!loading &&
        data &&
        data.map((hallData) => {
          const { _id, hallName, capacity, price, type } = hallData;
          return (
            // Custom Hall Card
            <HallCard
              key={_id}
              hallName={hallName}
              capacity={capacity}
              price={price}
              type={type}
            />
          );
        })}
    </div>
  );
}

export default Admin;
