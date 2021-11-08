import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import constant from '../const/const';
import routes from '../routes';

const AuthHeader = () => sessionStorage.getItem(constant.TOKEN);
const AuthID = () => sessionStorage.getItem(constant.ID);
const AuthRole = () => sessionStorage.getItem(constant.ROLE);

const PublicRoute = ({ component, ...rest }) => {
  const token = AuthHeader();
  const role = AuthRole();
  if (!token) {
    return <Route {...rest} component={component} />;
  }
  return (
    <Redirect
      to={{
        pathname:
          role === constant.OWNER ? routes.OWNER_DASHBOARD : routes.DASHBOARD
      }}
    />
  );
};

PublicRoute.propTypes = {
  component: PropTypes.elementType.isRequired
};

const ProtectedRoute = ({ component, access, ...rest }) => {
  const token = AuthHeader();
  const currUser = AuthRole();
  if (token && currUser === access) {
    return <Route {...rest} component={component} />;
  }
  return <Redirect to={{ pathname: routes.USER_BASE_PATH }} />;
};

ProtectedRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
  access: PropTypes.elementType.isRequired
};

const signOut = (history) => {
  sessionStorage.removeItem(constant.ID);
  sessionStorage.removeItem(constant.ROLE);
  sessionStorage.removeItem(constant.TOKEN);
  history.push(routes.USER_BASE_PATH);
};

const getAlertToast = (type, text = '', timer = 5000) => ({
  toast: true,
  position: 'bottom',
  titleText: text,
  type: text,
  showConfirmButton: false,
  timer
});

const getConfirm = (
  type = 'success',
  text = '',
  confirmButtonText = 'Yes'
) => ({
  type,
  text,
  showCancelButton: true,
  confirmButtonColor: '000',
  cancelButtonColor: '#939392',
  confirmButtonText
});

export {
  AuthHeader,
  AuthRole,
  AuthID,
  PublicRoute,
  ProtectedRoute,
  signOut,
  getAlertToast,
  getConfirm
};
