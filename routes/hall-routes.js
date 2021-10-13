import express from 'express';
import {
  createHall,
  getAllHalls,
  getHall,
  updateHall,
  deleteHall
} from '../controller/hall-controller';

const router = express.Router();

// REST API
router.route('/').get(getAllHalls).post(createHall);
router.route('/:id').get(getHall).patch(updateHall).delete(deleteHall);

export default router;
