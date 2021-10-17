import { fetchGET, fetchPOST, fetchPATCH } from './fetchAPI';

const newBooking = async (url, data) => {
  const response = await fetchPOST(url, data);
  return response;
};

const bookingListByUserID = async (url, data) => {
  const response = await fetchGET(url, data);
  return response;
};

const changeBookingStatus = async (url, data) => {
  const response = await fetchPATCH(url, data);
  return response;
};

export { newBooking, bookingListByUserID, changeBookingStatus };
