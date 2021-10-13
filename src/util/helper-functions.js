const AuthHeader = () => localStorage.getItem('TOKEN');
const AuthID = () => localStorage.getItem('ID');
const AuthRole = () => localStorage.getItem('ROLE');
export { AuthHeader, AuthRole, AuthID };
