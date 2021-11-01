import Book from '../models/book-model';
import catchAsync from '../utils/catchAsync';
import AppError from '../utils/appError';

// Create a new Bookings
// eslint-disable-next-line consistent-return
const createBooking = catchAsync(async (req, res, next) => {
  // create a new booking
  const newBooking = await Book.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      hall: newBooking
    }
  });
});

const checkalreadyBooked = catchAsync(async (req, res, next) => {
  const date = new Date(req.body.bookedDate).toISOString();
  // if incase one user booked this hall is already booked on this date
  const checkExisitingBooking = await Book.findOne({
    hallId: req.body.hallId,
    bookedDate: date,
    bookingStatus: 'Approved'
  });

  if (checkExisitingBooking) {
    return true;
  }

  return false;
});

// list bookings by hallID
const listBookingbyHallId = catchAsync(async (req, res) => {
  const { params = {} } = req;
  const { id } = params;
  const bookingList = await Book.find({ hallId: id });
  res.status(200).json({
    status: 'success',
    data: {
      bookings: bookingList
    }
  });
});

// List all Bookings
const listBooking = catchAsync(async (req, res) => {
  const bookingList = await Book.find();
  res.status(200).json({
    status: 'success',
    data: {
      bookings: bookingList
    }
  });
});

// List Bookings related to particular user(userID)
const listBookingByUserId = catchAsync(async (req, res) => {
  const { params = {} } = req;
  const { id } = params;
  const bookingList = await Book.find({ userId: id });
  res.status(200).json({
    status: 'success',
    data: {
      bookings: bookingList
    }
  });
});

// List Bookings related to particular owner(ownerId)
const listBookingByOwnerId = catchAsync(async (req, res) => {
  const { params = {} } = req;
  const { id } = params;

  const data = await Book.find();

  // Here we filter the booked halls only related to owner id
  const halls = data.filter((singleHall) => {
    const { hallId } = singleHall;
    const { ownedBy } = hallId;
    const { _id } = ownedBy;
    return _id.equals(id);
  });

  res.status(200).json({
    status: 'success',
    data: {
      bookings: halls
    }
  });
});

// Change the booking status to owner wish
const changeBookingStatus = catchAsync(async (req, res) => {
  const booking = await Book.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(201).json({
    status: 'success',
    data: {
      booking
    }
  });
});

export {
  createBooking,
  listBooking,
  listBookingByUserId,
  listBookingByOwnerId,
  changeBookingStatus,
  checkalreadyBooked,
  listBookingbyHallId
};
