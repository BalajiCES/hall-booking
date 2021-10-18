import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { BOOKING_HISTORY, BOOKING_STATUS, DASHBOARD } from '../../../routes';
import { AuthID, signOut } from '../../../util/helper-functions';

function NavBar() {
  const [id] = useState(AuthID());
  const history = useHistory();
  return (
    <nav>
      <ul>
        <Link to={DASHBOARD} className="link">
          <li>Dashboard</li>
        </Link>
        <Link to={`/profile/${id}`} className="link">
          <li>Profile</li>
        </Link>
        <Link to={BOOKING_STATUS} className="link">
          <li>Booking Status</li>
        </Link>
        <Link to={BOOKING_HISTORY} className="link">
          <li>Booking History</li>
        </Link>
        <button className="link" type="button" onClick={() => signOut(history)}>
          SignOut
        </button>
      </ul>
    </nav>
  );
}

export default NavBar;
