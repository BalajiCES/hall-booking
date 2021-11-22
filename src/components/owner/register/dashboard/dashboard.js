import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import register from '../data/register-actions';
import { AuthID } from '../../../../util/helper-functions';
import HallCard from '../../../common/cards/card';
import CustomLoader from '../../../../util/common';
import routes from '../../../../routes';
import constant from '../../../../const/const';

// Destructuring
const { EDIT_HALLS } = routes;
const { OWNER } = constant;
const { LIST_REGISTER_ID_REQUEST } = register;

// DashBoard Component
function OwnerDashboard() {
  const [id] = useState(AuthID());
  const dispatch = useDispatch();
  const history = useHistory();

  const { data = {}, loading = false } = useSelector(
    (state) => state.registerReducer.listHalls
  );
  const { hall = [] } = data;

  const hallEdit = (hallId) => {
    history.push(`${EDIT_HALLS}/${hallId}`);
  };

  useEffect(() => {
    dispatch({
      type: LIST_REGISTER_ID_REQUEST,
      payload: id
    });
  }, []);

  return (
    <div>
      <h2 className="hall-title">ALL REGISTERED HALLS</h2>
      <center>{loading && <CustomLoader loading={loading} />}</center>
      {!loading &&
        hall.map((hallData) => {
          const { _id, hallName, capacity, price, type, address } = hallData;
          return (
            // Custom Hall Card
            <HallCard
              key={_id}
              hallName={hallName}
              capacity={capacity}
              price={price}
              address={address}
              type={type}
              hallEdit={() => hallEdit(_id)}
              user={OWNER}
            />
          );
        })}
    </div>
  );
}

export default OwnerDashboard;
