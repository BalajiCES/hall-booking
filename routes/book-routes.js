import express from 'express';
import {
  createBooking,
  listBooking,
  listBookingByUserId,
  listBookingByOwnerId,
  changeBookingStatus
} from '../controller/book-controller';

const router = express.Router();

router.route('/:id').patch(changeBookingStatus);

router.route('/user/:id').get(listBookingByUserId);
router.route('/owner/:id').get(listBookingByOwnerId);

router.route('/').get(listBooking).post(createBooking);

export default router;
