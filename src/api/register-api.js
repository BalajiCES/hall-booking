import { fetchGET, fetchPATCH, fetchPOST } from './fetchAPI';

// Register New Hall
const registerHallAPI = async (url, data, auth) => {
  const response = await fetchPOST(url, data, auth);
  return response;
};

// List All Halls
const listAllHalls = async (url, payload) => {
  const response = await fetchGET(url, payload);
  return response;
};

// List Particular Hall By Id
const listHallById = async (url) => {
  const response = await fetchGET(url);
  return response;
};

// List Single Hall By Id
const listSingleHallById = async (url) => {
  const response = await fetchGET(url);
  return response;
};

// update single Hall By Id
const updateSingleHallById = async (url, data, auth) => {
  const response = await fetchPATCH(url, data, auth);
  return response;
};

export {
  registerHallAPI,
  listHallById,
  listAllHalls,
  listSingleHallById,
  updateSingleHallById
};
