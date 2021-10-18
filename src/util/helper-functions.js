/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-props-no-spreading */
import { Route, Redirect } from 'react-router-dom';

const AuthHeader = () => sessionStorage.getItem('TOKEN');
const AuthID = () => sessionStorage.getItem('ID');
const AuthRole = () => sessionStorage.getItem('ROLE');

const PublicRoute = ({ component, ...rest }) => {
  const token = AuthHeader();
  const role = AuthRole();
  if (!token) {
    return <Route {...rest} component={component} />;
  }
  return (
    <Redirect
      to={{ pathname: role === 'Admin' ? '/admin/dashboard' : '/dashboard' }}
    />
  );
};

const ProtectedRoute = ({ component, ...rest }) => {
  const token = AuthHeader();
  if (token) {
    return <Route {...rest} component={component} />;
  }
  return <Redirect to={{ pathname: '/' }} />;
};

const signOut = (history) => {
  sessionStorage.removeItem('ID');
  sessionStorage.removeItem('ROLE');
  sessionStorage.removeItem('TOKEN');
  history.push('/');
};

export { AuthHeader, AuthRole, AuthID, PublicRoute, ProtectedRoute, signOut };
