import { fetchGET, fetchPATCH, fetchPOST } from './fetchAPI';

const registerHallAPI = async (url, data) => {
  const response = await fetchPOST(url, data);
  return response;
};

const listAllHalls = async (url, payload) => {
  const response = await fetchGET(url, payload);
  return response;
};

const listHallById = async (url) => {
  const response = await fetchGET(url);
  return response;
};

const listSingleHallById = async (url) => {
  const response = await fetchGET(url);
  return response;
};

const updateSingleHallById = async (url, data) => {
  const response = await fetchPATCH(url, data);
  return response;
};

export {
  registerHallAPI,
  listHallById,
  listAllHalls,
  listSingleHallById,
  updateSingleHallById
};
