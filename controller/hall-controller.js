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

const getAllHalls = catchAsync(async (req, res) => {
  const features = new APIFeatures(Hall, req.query)
    .filter()
    .sort()
    .limitFileds()
    .pagination();

  const halls = await features.query;

  res.status(200).json({
    status: 'success',
    results: halls.length,
    data: {
      halls
    }
  });
});

const getHall = catchAsync(async (req, res) => {
  // Tour.findOne({_id:req.params.id});
  const hall = await Hall.find({ onwedBy: req.params.id });
  res.status(200).json({
    status: 'success',
    data: {
      hall
    }
  });
});

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

const deleteHall = catchAsync(async (req, res) => {
  // Not to send any data to client in delete operation
  await Hall.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: 'success',
    data: null
  });
});

export { createHall, getAllHalls, getHall, updateHall, deleteHall };
