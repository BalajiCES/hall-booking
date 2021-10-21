import express from 'express';
import {
  createHall,
  getAllHalls,
  getHallByOwnerId,
  updateHall,
  deleteHall,
  getSingleHall
} from '../controller/hall-controller';

const router = express.Router();

// REST API
router.route('/').get(getAllHalls).post(createHall);
router.route('/:id').get(getSingleHall).patch(updateHall).delete(deleteHall);
router.route('/owner/:id').get(getHallByOwnerId);

export default router;
