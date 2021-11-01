import React from 'react';
import { Formik } from 'formik';
import moment from 'moment';
import PropTypes from 'prop-types';
import './bookings.scss';
import constant from '../../../const/const';
import { Select } from '../Fields/fields';

function Bookings(props) {
  const {
    hallName,
    ownerName,
    date,
    status,
    userType,
    bookingId,
    statusChange,
    userName
  } = props;

  const options = [
    { key: 'Change Status', value: '' },
    { key: 'Approve', value: 'Approved' },
    { key: 'Reject', value: 'Rejected' }
  ];

  return (
    <div className="booking-container">
      {userType === constant.OWNER && (
        <h4 className={`status top ${status} `}>Status : {status} </h4>
      )}
      <h1>{hallName}</h1>
      <h4>Owner Name : {ownerName}</h4>
      <h4>Booked by : {userName}</h4>
      <h4>Booked Date: {moment(date).format('MM-DD-YYYY')}</h4>

      {userType === constant.OWNER && status === constant.PENDING ? (
        <Formik>
          {() => (
            <Select
              name="status"
              className="select-control"
              onChange={(e) => statusChange(e, bookingId)}
              options={options}
            />
          )}
        </Formik>
      ) : (
        <h4 className={`status  ${status} `}>Status : {status} </h4>
      )}
    </div>
  );
}

Bookings.propTypes = {
  hallName: PropTypes.string.isRequired,
  ownerName: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  bookingId: PropTypes.string,
  status: PropTypes.string.isRequired,
  userType: PropTypes.string.isRequired,
  statusChange: PropTypes.func
};

Bookings.defaultProps = {
  statusChange: () => {},
  bookingId: ''
};

export default Bookings;
