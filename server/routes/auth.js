import express from 'express';
import { login } from '../controller/Auth.js';
import { LOGIN } from '../Constants.js';

const router = express.Router();

router.post(LOGIN, login);

export default router;