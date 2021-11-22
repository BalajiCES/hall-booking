import { fetchGET, fetchPOST, fetchPATCH, fetchDELETE } from './fetchAPI';

// Create Booking API
const newBooking = async (url, data, auth) => {
  const response = await fetchPOST(url, data, auth);
  return response;
};

// List All Booking API
const listAllBookings = async (url) => {
  const response = await fetchGET(url);
  return response;
};

// List Booking by UserID API
const bookingListByUserID = async (url, data) => {
  const response = await fetchGET(url, data);
  return response;
};

// Changing Booking Status API
const changeBookingStatus = async (url, data, auth) => {
  const response = await fetchPATCH(url, data, auth);
  return response;
};

// Delete Booking
const deleteBooking = async (url, auth) => {
  const response = await fetchDELETE(url, auth);
  return response;
};

export {
  newBooking,
  bookingListByUserID,
  changeBookingStatus,
  listAllBookings,
  deleteBooking
};
