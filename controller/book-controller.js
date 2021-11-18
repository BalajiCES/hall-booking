import Book from '../models/book-model';
import AppError from '../utils/appError';
import catchAsync from '../utils/catchAsync';

// Create a new Bookings
const createBooking = catchAsync(async (req, res, next) => {
  // check this booking is already in database
  const data = await Book.findOne(req.body);
  if (data) {
    return next(new AppError('This Hall is already booked by you'));
  }
  // create a new booking
  const newBooking = await Book.create(req.body);
  return res.status(201).json({
    status: 'success',
    data: {
      hall: newBooking
    }
  });
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
  // changing all other Booking on this booked date to reject
  const currId = await Book.findOne({ _id: req.params.id });
  const { hallId, startDate, endDate } = currId;
  const { _id } = hallId;
  console.log(_id);

  const rejectStatus = await Book.updateMany(
    { hallId: _id, startDate, endDate },
    { bookingStatus: 'Rejected' },
    {
      new: true,
      runValidators: true
    }
  );

  console.log(rejectStatus);

  // Update the current Booking to Approve or Reject
  const booking = await Book.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  // send the status to the client
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
  listBookingbyHallId
};
