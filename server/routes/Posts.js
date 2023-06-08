import express from "express";
import { verifyToken } from "../middleware/Auth.js";
import { getFeedPosts, getUserPosts, likePost } from '../controller/Posts.js';
import { SLASH, ID, POSTS, LIKE, POST_ID } from "../Constants.js";

const router = express.Router();

/* GET HOME PAGE FEED FOR THE LOGINED USER */
router.get(SLASH, verifyToken, getFeedPosts);
/* GET ALL FEEDS OF A CERTAIN USER */
router.get(ID+POSTS, verifyToken, getUserPosts);
/* LIKE/UNLIKE A USER'S POST */
router.put(POST_ID+LIKE, verifyToken, likePost);

export default router;