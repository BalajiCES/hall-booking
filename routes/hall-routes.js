import express from 'express';
import {
  createHall,
  getAllHalls,
  getHallByOwnerId,
  updateHall,
  deleteHall,
  getSingleHall
} from '../controller/hall-controller';
import { protect } from '../controller/auth-controllers';

const router = express.Router();

// Hall Route Handler
router.route('/').get(getAllHalls).post(protect, createHall);
router
  .route('/:id')
  .get(getSingleHall)
  .patch(protect, updateHall)
  .delete(protect, deleteHall);
router.route('/owner/:id').get(getHallByOwnerId);

export default router;
