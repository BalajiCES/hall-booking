import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import routes from '../../../routes';
import { AuthID, signOut } from '../../../util/helper-functions';

function OwnerNavbar() {
  const [id] = useState(AuthID());
  const history = useHistory();
  return (
    <nav>
      <ul>
        <Link to={routes.OWNER_DASHBOARD} className="link">
          <li>DashBoard</li>
        </Link>
        <Link to={routes.REGISTER_HALL} className="link">
          <li>Register Hall</li>
        </Link>
        <Link to={`/profile/${id}`} className="link">
          <li>Profile</li>
        </Link>
        <Link to={routes.BOOKING_REQUEST} className="link">
          <li>Booking Request</li>
        </Link>
        <Link to={routes.OWNER_BOOKING_HISTORY} className="link">
          <li>Booking History</li>
        </Link>
        <button className="link" type="button" onClick={() => signOut(history)}>
          SignOut
        </button>
      </ul>
    </nav>
  );
}

export default OwnerNavbar;
