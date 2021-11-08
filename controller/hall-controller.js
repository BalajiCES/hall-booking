import Hall from '../models/hall-model';
import APIFeatures from '../utils/apiFeatures';
import catchAsync from '../utils/catchAsync';

// Register a new Hall
const createHall = catchAsync(async (req, res) => {
  const { body = {} } = req;
  const newHall = await Hall.create(body);
  res.status(201).json({
    status: 'success',
    data: {
      hall: newHall
    }
  });
});

// GET All Halls
const getAllHalls = catchAsync(async (req, res) => {
  const { query = {} } = req;
  const features = new APIFeatures(Hall.find({}), query)
    .filterByStrength()
    .filterByEvent()
    .filterByPrice()
    .filterByType();

  const halls = await features.query;

  res.status(200).json({
    status: 'success',
    data: {
      halls
    }
  });
});

// GET All Halls Related to owner
const getHallByOwnerId = catchAsync(async (req, res) => {
  const { params = {} } = req;
  const { id } = params;
  const hall = await Hall.find({ ownedBy: id });
  res.status(200).json({
    status: 'success',
    data: {
      hall
    }
  });
});

// GET Single Halls
const getSingleHall = catchAsync(async (req, res) => {
  const { params = {} } = req;
  const { id } = params;
  const singleHall = await Hall.findOne({ _id: id });
  res.status(200).json({
    status: 'success',
    data: {
      hall: singleHall
    }
  });
});

// Update Single Halls
const updateHall = catchAsync(async (req, res) => {
  const { params = {}, body = {} } = req;
  const { id } = params;
  const hall = await Hall.findByIdAndUpdate(id, body, {
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

// Delete Single Halls
const deleteHall = catchAsync(async (req, res) => {
  const { params = {} } = req;
  const { id } = params;
  // Not to send any data to client in delete operation
  await Hall.findByIdAndDelete(id);
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
