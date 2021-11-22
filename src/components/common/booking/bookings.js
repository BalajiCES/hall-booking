import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import dayjs from 'dayjs';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';
import './bookings.scss';
import constant from '../../../const/const';
import { Select } from '../Fields/fields';

dayjs.extend(LocalizedFormat);
dayjs.extend(relativeTime);

function Bookings(props) {
  const {
    hallName,
    ownerName,
    startDate,
    endDate,
    status,
    userType,
    bookingId,
    id,
    statusChange,
    userName,
    created,
    cancelBooking
  } = props;
  const [showCancel, setshowCancel] = useState(false);

  const options = [
    { key: 'Change Status', value: '' },
    { key: 'Approve', value: 'Approved' },
    { key: 'Reject', value: 'Rejected' }
  ];

  useEffect(() => {
    let timer;
    if (created) {
      const value = dayjs(created).fromNow();
      if (value.includes('seconds')) {
        setshowCancel(true);
      } else if (value.includes('minute')) {
        const relatedArray = value.split(' ')[0];
        if (relatedArray <= 30) {
          setshowCancel(true);
          timer = setTimeout(() => {
            setshowCancel(false);
          }, 30 * 60000 - relatedArray * 60000);
        }
      }
    }
    return () => {
      clearInterval(timer);
    };
  }, []);

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

      {userType === constant.USER && showCancel && (
        <button
          type="button"
          className="secondary cancel"
          onClick={() => cancelBooking(id)}
        >
          Cancel Booking
        </button>
      )}

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

      <h4 className="time">Requested on : {dayjs(created).fromNow()}</h4>
    </div>
  );
}

Bookings.propTypes = {
  hallName: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  ownerName: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  created: PropTypes.string.isRequired,
  bookingId: PropTypes.string,
  status: PropTypes.string.isRequired,
  userType: PropTypes.string.isRequired,
  statusChange: PropTypes.func,
  cancelBooking: PropTypes.func
};

Bookings.defaultProps = {
  statusChange: () => {},
  cancelBooking: () => {},
  bookingId: ''
};

export default Bookings;
