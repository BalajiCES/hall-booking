import jwt from 'jsonwebtoken';
import User from '../models/user-model';
import catchAsync from '../utils/catchAsync';
import AppError from '../utils/appError';

const signToken = (id) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRED_IN
  });

// 1) SIGN UP
const signUp = catchAsync(async (req, res) => {
  const newUser = await User.create(req.body);
  const { _id } = newUser;
  const token = signToken(_id);

  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: newUser
    }
  });
});

// 2) LOGIN
const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) check cred is exist
  if (!email || !password) {
    return next(new AppError('Please Provide email and password!', 400));
  }
  // 2) check if user exist and pasword is correct
  const user = await User.findOne({ email }).select('+password');
  // console.log(user);

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  // 3)If every thing is ok send token to client
  const { _id } = user;
  const token = signToken(_id);
  return res.status(200).json({
    status: 'success',
    userId: _id,
    role: user.role,
    token
  });
});

// 3) PROTECT ROUTES
const protect = catchAsync(async (req, res, next) => {
  // 1) Getting token and check if its there
  let token;
  if (req.headers.authorization) {
    token = req.headers.authorization;
  }
  if (!token) {
    return next(new AppError('You are not logged in to get Access', 401));
  }

  // 2) validate token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  console.log(decoded);

  // 3)Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return new new AppError(
      'The user belonging to the user is no longer exist.',
      401
    )();
  }
  req.user = currentUser;
  return next();
});

const updateUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  res.status(201).json({
    status: 'success',
    data: {
      user
    }
  });
});

const getSingleUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id);
  res.status(200).json({
    status: 'success',
    data: {
      user
    }
  });
});

export { signUp, login, protect, getSingleUser, updateUser };
