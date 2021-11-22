import { fetchGET, fetchPOST, fetchPATCH } from './fetchAPI';

// SignIn API
const signinAPI = async (url, data) => {
  const response = await fetchPOST(url, data);
  return response;
};

// SignUp API
const signupAPI = async (url, data) => {
  const response = await fetchPOST(url, data);
  return response;
};

// Get Single User API
const listSingleUser = async (url, data) => {
  const response = await fetchGET(url, data);
  return response;
};

// Update User API
const updateUser = async (url, data, auth) => {
  const response = await fetchPATCH(url, data, auth);
  return response;
};

// List all Users
const listAllUser = async (url) => {
  const response = await fetchGET(url);
  return response;
};

export { signinAPI, signupAPI, listSingleUser, updateUser, listAllUser };
