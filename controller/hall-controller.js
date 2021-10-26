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
  const features = new APIFeatures(Hall.find({}), req.query)
    .search()
    .filterByStrength()
    .filterByEvent()
    .filterByPrice()
    .filterByType()
    .filterByDate();
  const halls = await features.query;

  res.status(200).json({
    status: 'success',
    // results: halls.length,
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
