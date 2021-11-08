import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import constant from '../../../const/const';
import errors from '../../../const/error';
import routes from '../../../routes';
import { AuthID, getConfirm, signOut } from '../../../util/helper-functions';

// Destructuring
const { ACTIVE, LINK, WARNING, DASHBOARD, PROFILE, HISTORY, STATUS } = constant;
const { DASHBOARD: USER_DASHBOARD, BOOKING_STATUS, BOOKING_HISTORY } = routes;

function NavBar() {
  const [id] = useState(AuthID());
  const [activeMenu, setactiveMenu] = useState(DASHBOARD);
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
          to={USER_DASHBOARD}
          className={`${
            activeMenu.includes(DASHBOARD) ? `${ACTIVE}` : ''
          } ${LINK}`}
        >
          <li>Dashboard</li>
        </Link>
        <Link
          to={`/profile/${id}`}
          className={`${
            activeMenu.includes(PROFILE) ? `${ACTIVE}` : ''
          } ${LINK}`}
        >
          <li>Profile</li>
        </Link>
        <Link
          to={BOOKING_STATUS}
          className={`${
            activeMenu.includes(STATUS) ? `${ACTIVE}` : ''
          } ${LINK} `}
        >
          <li>Booking Status</li>
        </Link>
        <Link
          to={BOOKING_HISTORY}
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

export default NavBar;
