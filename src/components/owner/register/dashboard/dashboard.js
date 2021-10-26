import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import register from '../data/register-actions';
import { AuthID } from '../../../../util/helper-functions';
import './dashboard.scss';
import HallCard from '../../../common/cards/card';
import CustomLoader from '../../../../util/common';

function OwnerDashboard() {
  const [id] = useState(AuthID());
  const dispatch = useDispatch();
  const history = useHistory();

  const { data = {}, loading = false } = useSelector(
    (state) => state.registerReducer.listHalls
  );
  const { hall = [] } = data;

  const hallEdit = (hallId) => {
    history.push(`/owner/edit-hall/${hallId}`);
  };

  useEffect(() => {
    dispatch({
      type: register.LIST_REGISTER_ID_REQUEST,
      payload: id
    });
  }, []);

  return (
    <div>
      <h2 className="hall-title">ALL REGISTERED HALLS</h2>
      <center>{loading && <CustomLoader loading={loading} />}</center>
      {!loading &&
        hall.map((hallData) => {
          const { _id, hallName, capacity, price } = hallData;
          return (
            <HallCard
              key={_id}
              hallName={hallName}
              capacity={capacity}
              price={price}
              hallEdit={() => hallEdit(_id)}
            />
          );
        })}
    </div>
  );
}

export default OwnerDashboard;
