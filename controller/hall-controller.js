import Hall from '../models/hall-model';
import APIFeatures from '../utils/apiFeatures';
import catchAsync from '../utils/catchAsync';

const createHall = catchAsync(async (req, res) => {
  const newHall = await Hall.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      hall: newHall
    }
  });
});

// GET ALL HALLS
const getAllHalls = catchAsync(async (req, res) => {
  let query = Hall.find();

  // filter based on strength
  if (req.query.capacity) {
    console.log('I am there', req.query.capacity);
    if (req.query.capacity === 'default') {
      query = Hall.find({});
    } else {
      query = Hall.find({ capacity: req.query.capacity });
    }
  }

  // search based on hall name
  if (req.query.search) {
    console.log(req.query.search);
    query = Hall.find({
      $text: { $search: req.query.search }
    });
  }

  // filter based on event
  if (req.query.event) {
    if (req.query.event === 'default') {
      query = Hall.find({});
    } else {
      query = Hall.find({ event: req.query.event });
    }
  }

  // filter based on price
  if (req.query.sort) {
    if (req.query.sort === 'high-to-low') {
      query = query.sort('-price');
    } else if (req.query.sort === 'low-to-high') {
      query = query.sort('price');
    } else {
      query = query.sort('-createdAt');
    }
  }

  // filter based on type
  if (req.query.type) {
    if (req.query.type === 'default') {
      query = Hall.find({});
    } else {
      query = Hall.find({ type: req.query.type });
    }
  }

  const halls = await query;

  res.status(200).json({
    status: 'success',
    results: halls.length,
    data: {
      halls
    }
  });
});

// GET ALL OWNER HALLS
const getHallByOwnerId = catchAsync(async (req, res) => {
  // Tour.findOne({_id:req.params.id});
  console.log('Owner Hall Id', req.params.id);
  const hall = await Hall.find({ ownedBy: req.params.id });
  res.status(200).json({
    status: 'success',
    data: {
      hall
    }
  });
});

// Edit Halls
const getSingleHall = catchAsync(async (req, res) => {
  const singleHall = await Hall.findOne({ _id: req.params.id });
  res.status(200).json({
    status: 'success',
    data: {
      hall: singleHall
    }
  });
});

// Update Halls
const updateHall = catchAsync(async (req, res) => {
  const hall = await Hall.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  res.status(201).json({
    status: 'success',
    data: {
      hall
    }
  });
});

// Delete Halls
const deleteHall = catchAsync(async (req, res) => {
  // Not to send any data to client in delete operation
  await Hall.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: 'success',
    data: null
  });
});

export {
  createHall,
  getAllHalls,
  getHallByOwnerId,
  updateHall,
  deleteHall,
  getSingleHall
};
