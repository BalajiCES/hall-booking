import React, { useEffect, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import constant from '../../../const/const';
import errors from '../../../const/error';
import routes from '../../../routes';
import { getConfirm, signOut } from '../../../util/helper-functions';

// Destructuring
const { WARNING, ACTIVE, LINK } = constant;
const { USERS_PATH, HALLS_PATH } = routes;

function AdminNavbar() {
  const history = useHistory();
  const location = useLocation();
  const [activeMenu, setactiveMenu] = useState(HALLS_PATH);
  const [toogleNav, setToogleNav] = useState(false);

  const toggleNavFun = () => {
    setToogleNav(!toogleNav);
  };

  useEffect(() => {
    const { pathname } = location;
    const currentMenu = pathname;
    setactiveMenu(currentMenu);
  }, [location]);

  return (
    <nav className="main-navbar">
      <div className="brand-title">Hall Booking</div>
      <div role="presentation" onClick={toggleNavFun}>
        <FontAwesomeIcon
          icon={faBars}
          size="2x"
          className="mr-2 toogle-button"
        />
      </div>
      <div className={`navbar-links ${toogleNav ? 'activenav' : ''}`}>
        <ul>
          <Link
            to={HALLS_PATH}
            className={`${
              activeMenu.includes(HALLS_PATH) ? `${ACTIVE}` : ''
            } ${LINK}`}
          >
            <li>All Halls</li>
          </Link>
          <Link
            to={USERS_PATH}
            className={`${
              activeMenu.includes(USERS_PATH) ? `${ACTIVE}` : ''
            } ${LINK}`}
          >
            <li>All Users</li>
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
      </div>
    </nav>
  );
}

export default AdminNavbar;
