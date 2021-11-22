import express from 'express';
import {
  createBooking,
  listBooking,
  listBookingByUserId,
  listBookingByOwnerId,
  changeBookingStatus,
  listBookingbyHallId,
  deleteBooking
} from '../controller/book-controller';
import { protect } from '../controller/auth-controllers';

const router = express.Router();

// Booking Route Handler
router.route('/').get(listBooking).post(protect, createBooking);
router.route('/:id').patch(protect, changeBookingStatus).delete(deleteBooking);
router.route('/user/:id').get(listBookingByUserId);
router.route('/owner/:id').get(listBookingByOwnerId);
router.route('/halls/:id').get(listBookingbyHallId);

export default router;
