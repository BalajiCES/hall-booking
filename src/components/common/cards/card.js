import React from 'react';
import './card.scss';

function HallCard(props) {
  const { hallName, price, capacity, status, user, intiateBooking, id } = props;
  return (
    <div className="hall-tile">
      <h3 className="title">{hallName}</h3>
      <h3 className="price">&#8377; {price}</h3>
      <h3 className="capacity">capacity : {capacity}</h3>
      {user === 'User' && (
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

export default HallCard;
