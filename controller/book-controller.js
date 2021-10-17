import Book from '../models/book-model';
import Hall from '../models/hall-model';
import catchAsync from '../utils/catchAsync';

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
  const bookingList = await Book.find({ userId: req.params.id });
  res.status(200).json({
    status: 'success',
    data: {
      bookings: bookingList
    }
  });
});

const listBookingByAdminId = catchAsync(async (req, res) => {
  const hall = await Hall.find({ onwedBy: req.params.id });
  // console.log('Owner Halls', hall);
  const bookingList = hall.map(async (val) => {
    const { _id } = val;
    const bookingDetails = await Book.findOne({ hallId: _id });
    return bookingDetails;
  });
  Promise.all(bookingList).then((result) => {
    res.status(200).json({
      status: 'success',
      data: {
        bookings: result
      }
    });
  });
});

const changeBookingStatus = catchAsync(async (req, res) => {
  const booking = await Book.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  console.log('Booking Status', booking);
  res.status(201).json({
    status: 'success',
    data: {
      booking
    }
  });
});

const createBooking = catchAsync(async (req, res) => {
  const newBooking = await Book.create(req.body);

  Hall.findByIdAndUpdate(
    req.body.hallId,
    { status: 'Selected' },
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

  console.log('ReqId', req.body.hallId);
});

export {
  createBooking,
  listBooking,
  listBookingByUserId,
  listBookingByAdminId,
  changeBookingStatus
};
