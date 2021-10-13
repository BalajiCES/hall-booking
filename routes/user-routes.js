import express from 'express';
import { signUp, login, getSingleUser } from '../controller/auth-controllers';

const router = express.Router();

router.post('/signup', signUp);
router.post('/login', login);

router.route('/:id').get(getSingleUser);

export default router;
