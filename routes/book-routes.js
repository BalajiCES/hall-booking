import express from 'express';
import {
  createBooking,
  listBooking,
  listBookingByUserId,
  listBookingByAdminId,
  changeBookingStatus
} from '../controller/book-controller';

const router = express.Router();

router.route('/:id').patch(changeBookingStatus);

router.route('/user/:id').get(listBookingByUserId);
router.route('/admin/:id').get(listBookingByAdminId);

router.route('/').get(listBooking).post(createBooking);

export default router;
