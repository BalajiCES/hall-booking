/* eslint-disable consistent-return */
import Book from '../models/book-model';
import Hall from '../models/hall-model';
import catchAsync from '../utils/catchAsync';
import constant from '../constant/constant';
import AppError from '../utils/appError';

const listBooking = catchAsync(async (req, res) => {
  const bookingList = await Book.find();
  res.status(200).json({
    status: 'success',
    data: {
      bookings: bookingList
    }
  });
});

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

const listBookingByOwnerId = catchAsync(async (req, res) => {
  const { params = {} } = req;
  const { id } = params;
  const hall = await Hall.find({ onwedBy: id });

  const bookingList = hall.map(async (val) => {
    const { _id } = val;
    const bookingDetails = await Book.findOne({ hallId: _id });
    return bookingDetails;
  });

  const filterdValue = await Promise.all(bookingList);
  const list = filterdValue.filter((data) => data != null);
  res.status(200).json({
    status: 'success',
    data: {
      bookings: list
    }
  });
});

const changeBookingStatus = catchAsync(async (req, res) => {
  const { bookingStatus } = req.body;

  if (bookingStatus === constant.APPROVED) {
    const currBooking = await Book.findOne(
      { _id: req.params.id },
      {
        hallId: 1
      }
    );
    const { _id } = currBooking.hallId;
    await Hall.findByIdAndUpdate(
      _id,
      {
        status: 'Booked'
      },
      {
        new: true,
        runValidators: true
      }
    );
  }

  // it will be applicable to all the case
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

const createBooking = catchAsync(async (req, res, next) => {
  const date = new Date(req.body.bookedDate).toISOString();
  // User id , hallid , booked date , booking status

  // if incase one user booked this hall on this date we need to prevent that
  const checkExisitingBooking = await Book.findOne({
    hallId: req.body.hallId,
    bookedDate: date
  });

  if (checkExisitingBooking != null) {
    return next(
      new AppError('This Hall is already Booked on this Date !', 400)
    );
  }

  // create a new booking
  const newBooking = await Book.create(req.body);

  // we consider this hall data for that particular date only
  Hall.findByIdAndUpdate(
    { _id: req.body.hallId },
    { status: 'Selected', $push: { bookings: newBooking } },
    {
      new: true,
      runValidators: true
    },
    (err) => {
      if (err) throw err;
    }
  );

  res.status(201).json({
    status: 'success',
    data: {
      hall: newBooking
    }
  });
});

export {
  createBooking,
  listBooking,
  listBookingByUserId,
  listBookingByOwnerId,
  changeBookingStatus
};
