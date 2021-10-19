import Book from '../models/book-model';
import Hall from '../models/hall-model';
import catchAsync from '../utils/catchAsync';
import constant from '../src/const/const';

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

const listBookingByOwnerId = catchAsync(async (req, res) => {
  const hall = await Hall.find({ onwedBy: req.params.id });
  // console.log('Owner Halls', hall);
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
  console.log('Req Body', req.body.bookingStatus);

  if (bookingStatus === constant.APPROVED) {
    const currBooking = await Book.findOne(
      { _id: req.params.id },
      {
        hallId: 1
      }
    );
    const { _id } = currBooking.hallId;
    console.log('CurrBooking', currBooking, _id);
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

  // console.log('Booking Status', booking);
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
  listBookingByOwnerId,
  changeBookingStatus
};
