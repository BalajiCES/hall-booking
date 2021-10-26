import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import routes from '../../../routes';
import { AuthID, getConfirm, signOut } from '../../../util/helper-functions';

function OwnerNavbar() {
  const [id] = useState(AuthID());
  const [activeMenu, setactiveMenu] = useState('dashboard');
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    const currentMenu = location.pathname;
    setactiveMenu(currentMenu);
  }, [location]);

  return (
    <nav>
      <ul>
        <Link
          to={routes.OWNER_DASHBOARD}
          className={`${activeMenu.includes('dashboard') ? 'active' : ''} link`}
        >
          <li>DashBoard</li>
        </Link>
        <Link
          to={routes.REGISTER_HALL}
          className={`${activeMenu.includes('register') ? 'active' : ''} link`}
        >
          <li>Register Hall</li>
        </Link>
        <Link
          to={`/owner/profile/${id}`}
          className={`${activeMenu.includes('profile') ? 'active' : ''} link`}
        >
          <li>Profile</li>
        </Link>
        <Link
          to={routes.BOOKING_REQUEST}
          className={`${activeMenu.includes('request') ? 'active' : ''} link `}
        >
          <li>Booking Request</li>
        </Link>
        <Link
          to={routes.OWNER_BOOKING_HISTORY}
          className={`${
            activeMenu.includes('history') ? 'link active' : ''
          } link`}
        >
          <li>Booking History</li>
        </Link>
        <button
          className="secondary"
          type="button"
          onClick={() => {
            Swal.fire(
              getConfirm('warning', 'Are you sure do you want to signout?')
            ).then((result) => {
              if (result.value) {
                signOut(history);
              }
            });
          }}
        >
          SignOut
        </button>
      </ul>
    </nav>
  );
}

export default OwnerNavbar;
