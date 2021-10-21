import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import user from './data/user-dashboard-actions';
import { AuthID } from '../../../util/helper-functions';
import HallCard from '../../common/cards/card';
import { Input, Select } from '../../common/Fields/fields';
import './user-dashbaord.scss';

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

  const priceOptions = [
    { key: 'Sort by: Price', value: 'default' },
    { key: 'Low To High', value: 'low-to-high' },
    { key: 'High To Low', value: 'high-to-low' }
  ];

  const eventOptions = [
    { key: 'filter by: Event', value: 'default' },
    { key: 'Marriage', value: 'Marriage' },
    { key: 'Birthday', value: 'Birthday' },
    { key: 'Custom', value: 'Custom' }
  ];

  const typeOptions = [
    { key: 'Type by: Hall', value: 'default' },
    { key: 'A/c', value: 'ac' },
    { key: 'Non-A/c', value: 'non-ac' }
  ];

  const strengthOptions = [
    { key: 'Size by: Hall', value: 'default' },
    { key: 'Below 1000', value: 'lt:1000' },
    { key: 'Greater than 1000', value: 'gt:1000' }
  ];

  const searchQueryName = (event) => {
    const { value } = event.target;
    dispatch({
      type: user.USER_DASHBOARD_REQUEST,
      payload: { search: value }
    });
  };

  const filterEvent = (event) => {
    const { value } = event.target;
    dispatch({
      type: user.USER_DASHBOARD_REQUEST,
      payload: { event: value }
    });
  };

  const filterPrice = (event) => {
    const { value } = event.target;
    dispatch({
      type: user.USER_DASHBOARD_REQUEST,
      payload: { sort: value }
    });
  };

  const filterType = (event) => {
    const { value } = event.target;
    dispatch({
      type: user.USER_DASHBOARD_REQUEST,
      payload: { type: value }
    });
  };

  const filterStrength = (event) => {
    const { value } = event.target;
    console.log('Value', value);
    dispatch({
      type: user.USER_DASHBOARD_REQUEST,
      payload: { capacity: value }
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
      <Formik>
        {() => (
          <div className="filter">
            <Input
              name="hallName"
              id="hallName"
              onChange={searchQueryName}
              className="filter-input"
            />
            <Select
              className="filter-col"
              name="price"
              onChange={filterPrice}
              options={priceOptions}
            />
            <Select
              className="filter-col"
              name="event"
              onChange={filterEvent}
              options={eventOptions}
            />

            <Select
              className="filter-col"
              name="type"
              onChange={filterType}
              options={typeOptions}
            />

            <Select
              className="filter-col"
              name="capacity"
              onChange={filterStrength}
              options={strengthOptions}
            />
          </div>
        )}
      </Formik>
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
