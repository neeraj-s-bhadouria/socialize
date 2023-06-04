import express from 'express';
import { getUser } from '../controller/User.js';
import { verifyToken } from '../middleware/Auth.js';
import { ID } from '../Constants.js';

const router = express.Router();

/* GET USER BY ID */
router.get(ID, verifyToken, getUser);

export default router;