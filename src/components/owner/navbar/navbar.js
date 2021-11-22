import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import constant from '../../../const/const';
import errors from '../../../const/error';
import routes from '../../../routes';
import { AuthID, getConfirm, signOut } from '../../../util/helper-functions';

// Destructuring
const {
  ACTIVE,
  LINK,
  WARNING,
  DASHBOARD,
  REGISTER,
  PROFILE,
  REQUEST,
  HISTORY
} = constant;
const {
  OWNER_DASHBOARD,
  REGISTER_HALL,
  OWNER_PROFILE_PATH,
  BOOKING_REQUEST,
  OWNER_BOOKING_HISTORY
} = routes;

function OwnerNavbar() {
  const [id] = useState(AuthID());
  const [activeMenu, setactiveMenu] = useState(DASHBOARD);
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    const { pathname } = location;
    const currentMenu = pathname;
    setactiveMenu(currentMenu);
  }, [location]);

  return (
    <nav>
      <ul>
        <Link
          to={OWNER_DASHBOARD}
          className={`${
            activeMenu.includes(DASHBOARD) ? `${ACTIVE}` : ''
          } ${LINK}`}
        >
          <li>DashBoard</li>
        </Link>
        <Link
          to={REGISTER_HALL}
          className={`${
            activeMenu.includes(REGISTER) ? `${ACTIVE}` : ''
          } ${LINK}`}
        >
          <li>Register Hall</li>
        </Link>
        <Link
          to={`${OWNER_PROFILE_PATH}/${id}`}
          className={`${
            activeMenu.includes(PROFILE) ? `${ACTIVE}` : ''
          } ${LINK}`}
        >
          <li>Profile</li>
        </Link>
        <Link
          to={BOOKING_REQUEST}
          className={`${
            activeMenu.includes(REQUEST) ? `${ACTIVE}` : ''
          } ${LINK} `}
        >
          <li>Booking Request</li>
        </Link>
        <Link
          to={OWNER_BOOKING_HISTORY}
          className={`${
            activeMenu.includes(HISTORY) ? `${LINK} ${ACTIVE}` : ''
          } ${LINK}`}
        >
          <li>Booking History</li>
        </Link>
        <button
          className="secondary"
          type="button"
          onClick={() => {
            Swal.fire(getConfirm(WARNING, errors.signOut)).then((result) => {
              const { value } = result;
              if (value) {
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
