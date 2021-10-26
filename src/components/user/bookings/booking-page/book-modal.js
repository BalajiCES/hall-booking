import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './book-modal.scss';
import { Formik } from 'formik';
import { Input } from '../../../common/Fields/fields';

function BookModal(props) {
  const [formDate, setFormDate] = useState('');

  const { show, closeBooking, hallState, bookingSuccess } = props;
  if (!show) {
    return null;
  }
  return (
    <div
      className="modal"
      onClick={closeBooking}
      role="button"
      tabIndex={0}
      aria-hidden="true"
    >
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        role="button"
        tabIndex={0}
        aria-hidden="true"
      >
        <div className="modal-header">
          <h4 className="modal-title">{hallState.hallName}</h4>
        </div>
        <div className="modal-body">
          <p>
            The Price of the hall is
            <span className="bold">{hallState.price}</span>
          </p>
          <p>
            The maximum Capacity of the hall is
            <span className="bold">{hallState.capacity}</span>
          </p>
          <p>
            This hall is haing{' '}
            <span className="bold hall-type">{`${hallState.type} `}</span>
          </p>
          <p>Please select a Date to book a hall</p>
          <Formik>
            {() => (
              <Input
                name="date"
                type="date"
                className="form-control"
                onChange={(event) => setFormDate(event.target.value)}
              />
            )}
          </Formik>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="primary"
            onClick={() => bookingSuccess(formDate)}
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}

BookModal.propTypes = {
  show: PropTypes.bool.isRequired,
  hallState: PropTypes.shape({
    hallName: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    capacity: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired
  }).isRequired,
  closeBooking: PropTypes.func.isRequired,
  bookingSuccess: PropTypes.func.isRequired
};

export default BookModal;
