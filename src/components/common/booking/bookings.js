import React from 'react';
import { Formik } from 'formik';
import dayjs from 'dayjs';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import PropTypes from 'prop-types';
import './bookings.scss';
import constant from '../../../const/const';
import { Select } from '../Fields/fields';

dayjs.extend(LocalizedFormat);

function Bookings(props) {
  const {
    hallName,
    ownerName,
    startDate,
    endDate,
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
      <h4 className={`status top ${status} `}>Status : {status} </h4>

      <h1>{hallName}</h1>
      <h4>Owner Name : {ownerName}</h4>
      <h4>Booked by : {userName}</h4>
      <h4>
        Booking Start Date:{' '}
        {dayjs(startDate).format('dddd, MMMM D, YYYY h:mm A')}
      </h4>
      <h4>
        Booking End Date: {dayjs(endDate).format('dddd, MMMM D, YYYY h:mm A')}
      </h4>

      {userType === constant.OWNER && status === constant.PENDING && (
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
      )}
    </div>
  );
}

Bookings.propTypes = {
  hallName: PropTypes.string.isRequired,
  ownerName: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
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
