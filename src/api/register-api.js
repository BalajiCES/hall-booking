import { fetchGET, fetchPOST } from './fetchAPI';

const registerHallAPI = async (url, data) => {
  const response = await fetchPOST(url, data);
  return response;
};

const listHallById = async (url, data) => {
  const response = await fetchGET(url, data);
  return response;
};

export { registerHallAPI, listHallById };
