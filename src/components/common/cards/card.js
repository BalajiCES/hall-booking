import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faRupeeSign } from '@fortawesome/free-solid-svg-icons';
import constant from '../../../const/const';
import './card.scss';

// Destructuring
const { USER, OWNER } = constant;

function HallCard({
  hallName,
  price,
  capacity,
  status,
  user,
  intiateBooking,
  hallEdit,
  type,
  address,
  id
}) {
  return (
    <div className="hall-tile">
      <div className="section-1">
        <h3 className="title">{hallName}</h3>
        <h3 className="price">
          <FontAwesomeIcon icon={faRupeeSign} className="mr-2" /> {price}
        </h3>
      </div>
      <div className="section-2">
        <h3 className="capacity">
          <FontAwesomeIcon icon={faUsers} className="mr-2" />
          {capacity}
        </h3>
        <h3 className="type">{type}</h3>
        {/* show book now button for only User */}
        {user === USER && (
          <div className="button-container">
            <button
              className="primary"
              type="button"
              onClick={() => {
                intiateBooking({ id, hallName, price, capacity, status, type });
              }}
            >
              Book Hall
            </button>
          </div>
        )}
        {/* show edit halls button for only owner */}
        {user === OWNER && (
          <button className="edit primary" type="button" onClick={hallEdit}>
            Edit
          </button>
        )}
      </div>

      {/* Address */}
      <div className="section-3">
        <h3 className="address">{address}</h3>
      </div>
    </div>
  );
}

HallCard.propTypes = {
  id: PropTypes.number,
  hallName: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  capacity: PropTypes.number.isRequired,
  address: PropTypes.string,
  status: PropTypes.string,
  user: PropTypes.string,
  type: PropTypes.string,
  intiateBooking: PropTypes.func,
  hallEdit: PropTypes.func
};

HallCard.defaultProps = {
  id: 0,
  intiateBooking: () => {},
  hallEdit: () => {},
  address: '',
  status: '',
  user: '',
  type: ''
};

export default HallCard;
