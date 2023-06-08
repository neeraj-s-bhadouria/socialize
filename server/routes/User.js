import express from 'express';
import { getUser, getUserFriends, addRemoveFriend } from '../controller/User.js';
import { verifyToken } from '../middleware/Auth.js';
import { ID, FRIEND_ID, FRIENDS } from '../Constants.js';

const router = express.Router();

/* GET USER BY ID */
router.get(ID, verifyToken, getUser);
/* GET USER'S FRIENDS*/
router.get(ID+FRIENDS, verifyToken, getUserFriends);
/* FRIEND/UNFRIEND USERS*/
router.put(ID+FRIEND_ID, verifyToken, addRemoveFriend);

export default router;