import { fetchGET, fetchPOST } from './fetchAPI';

const signinAPI = async (url, data) => {
  const response = await fetchPOST(url, data);
  return response;
};

const signupAPI = async (url, data) => {
  const response = await fetchPOST(url, data);
  return response;
};

const listSingleUser = async (url, data) => {
  const response = await fetchGET(url, data);
  return response;
};

export { signinAPI, signupAPI, listSingleUser };
