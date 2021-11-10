import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomLoader from '../../../../util/common';
import adminRequests from '../data/admin-dashboard-actions';
import './users.scss';

function Users() {
  const dispatch = useDispatch();

  const { data = [], loading = false } = useSelector(
    (state) => state.adminRequestReducer.adminData
  );

  useEffect(() => {
    dispatch({
      type: adminRequests.ADMIN_USER_REQUEST_REQUEST
    });
  }, []);

  return (
    <div>
      <h2 className="hall-title">ALL USERS</h2>
      <h2 className="users-count">
        Total Users Registered : {data.length || 0}
      </h2>
      <center>{loading && <CustomLoader loading={loading} />}</center>
      {!loading &&
        data &&
        data.map((userData) => {
          const { _id, firstName, lastName, email, role } = userData;
          return (
            <div key={_id} className="user-profile">
              <p className={`user-role ${role}`}>{role}</p>
              <h2 className="user-name">{`${firstName} ${lastName}`}</h2>
              <p className="user-email">{email}</p>
            </div>
          );
        })}
    </div>
  );
}

export default Users;
