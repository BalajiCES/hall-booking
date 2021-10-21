import React from 'react';
import PropTypes from 'prop-types';
import './card.scss';
import constant from '../../../const/const';

function HallCard({
  hallName,
  price,
  capacity,
  status,
  user,
  intiateBooking,
  hallEdit,
  id
}) {
  return (
    <div className="hall-tile">
      {user !== constant.USER && (
        <button type="button" onClick={hallEdit}>
          Edit
        </button>
      )}
      <h3 className="title">{hallName}</h3>
      <h3 className="price">&#8377; {price}</h3>
      <h3 className="capacity">capacity : {capacity}</h3>
      {user === constant.USER && (
        <div className="button-container">
          {status !== 'Booked' && status !== 'Selected' && (
            <button type="button" onClick={() => intiateBooking(id)}>
              Book Now
            </button>
          )}
        </div>
      )}
    </div>
  );
}

HallCard.propTypes = {
  id: PropTypes.string,
  hallName: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  capacity: PropTypes.number.isRequired,
  status: PropTypes.string,
  user: PropTypes.string,
  intiateBooking: PropTypes.func,
  hallEdit: PropTypes.func
};

HallCard.defaultProps = {
  id: 0,
  intiateBooking: () => {},
  hallEdit: () => {},
  status: '',
  user: ''
};

export default HallCard;
