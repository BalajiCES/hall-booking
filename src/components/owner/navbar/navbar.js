import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import constant from '../../../const/const';
import errors from '../../../const/error';
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
          className={`${
            activeMenu.includes('dashboard') ? `${constant.ACTIVE}` : ''
          } ${constant.LINK}`}
        >
          <li>DashBoard</li>
        </Link>
        <Link
          to={routes.REGISTER_HALL}
          className={`${
            activeMenu.includes('register') ? `${constant.ACTIVE}` : ''
          } ${constant.LINK}`}
        >
          <li>Register Hall</li>
        </Link>
        <Link
          to={`${routes.OWNER_PROFILE_PATH}/${id}`}
          className={`${
            activeMenu.includes('profile') ? `${constant.ACTIVE}` : ''
          } ${constant.LINK}`}
        >
          <li>Profile</li>
        </Link>
        <Link
          to={routes.BOOKING_REQUEST}
          className={`${
            activeMenu.includes('request') ? `${constant.ACTIVE}` : ''
          } ${constant.LINK} `}
        >
          <li>Booking Request</li>
        </Link>
        <Link
          to={routes.OWNER_BOOKING_HISTORY}
          className={`${
            activeMenu.includes('history')
              ? `${constant.LINK} ${constant.ACTIVE}`
              : ''
          } ${constant.LINK}`}
        >
          <li>Booking History</li>
        </Link>
        <button
          className="secondary"
          type="button"
          onClick={() => {
            Swal.fire(getConfirm(constant.WARNING, errors.signOut)).then(
              (result) => {
                if (result.value) {
                  signOut(history);
                }
              }
            );
          }}
        >
          SignOut
        </button>
      </ul>
    </nav>
  );
}

export default OwnerNavbar;
