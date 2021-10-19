import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import './bookings.scss';
import constant from '../../../const/const';

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

  return (
    <div className="booking-container">
      <h2>Hall Name : {hallName}</h2>
      <p>Owner Name : {ownerName}</p>
      <h3>Booked by : {userName}</h3>
      <h4>Booked Date: {moment(date).format('LLLL')}</h4>
      {userType === constant.OWNER && <p>Status : {status} </p>}
      {userType === constant.OWNER ? (
        <select
          name="status"
          className="select-control"
          onChange={(e) => statusChange(e, bookingId)}
        >
          <option> Change Status</option>
          <option value="Approved">Approve</option>
          <option value="Rejected">Reject</option>
        </select>
      ) : (
        <p>Status : {status} </p>
      )}
    </div>
  );
}

Bookings.propTypes = {
  hallName: PropTypes.string.isRequired,
  ownerName: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  bookingId: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  userType: PropTypes.string.isRequired,
  statusChange: PropTypes.func
};

Bookings.defaultProps = {
  statusChange: () => {}
};

export default Bookings;
