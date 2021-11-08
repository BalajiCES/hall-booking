import express from 'express';
import {
  signUp,
  login,
  getSingleUser,
  updateUser,
  protect
} from '../controller/auth-controllers';

const router = express.Router();

// User Route Handler
router.post('/signup', signUp);
router.post('/login', login);
router.route('/:id').get(getSingleUser).patch(protect, updateUser);

export default router;
