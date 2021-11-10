import jwt from 'jsonwebtoken';
import User from '../models/user-model';
import catchAsync from '../utils/catchAsync';
import AppError from '../utils/appError';

// Creating Token
const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRED_IN
  });

// SIGN UP
const signUp = catchAsync(async (req, res, next) => {
  // creating a new user
  const newUser = await User.create(req.body);
  const { _id } = newUser;
  const token = signToken(_id);

  return res.status(201).json({
    status: 'success',
    token,
    data: {
      user: newUser
    }
  });
});

// LOGIN
const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) check cred is exist
  if (!email || !password) {
    return next(new AppError('Please Provide email and password!', 400));
  }
  // 2) check if user exist and pasword is correct
  const user = await User.findOne({ email }).select('+password');

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

// Protecting Routes Authorization
const protect = catchAsync(async (req, res, next) => {
  const { headers = {} } = req;
  const { authorization } = headers;

  // 1) Getting token and check if its there
  let token;
  if (authorization && authorization.startsWith('Bearer')) {
    const validToken = authorization.split(' ')[1];
    token = validToken;
  }

  if (!token) {
    return next(new AppError('Not authorize to access this route', 401));
  }

  // 2) validate token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decoded.id);
  return next();
});

// Update User
const updateUser = catchAsync(async (req, res) => {
  const { params = {}, body = {} } = req;
  const { id } = params;
  const user = await User.findByIdAndUpdate(id, body, {
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

// Get Single User
const getSingleUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  res.status(200).json({
    status: 'success',
    data: {
      user
    }
  });
});

// list All User
const listAllUsers = catchAsync(async (req, res) => {
  const users = await User.find();
  res.status(200).json({
    status: 'success',
    data: {
      users
    }
  });
});

export { signUp, login, getSingleUser, updateUser, listAllUsers, protect };
