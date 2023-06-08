import Post from '../model/Post.js';
import User from '../model/User.js';

/* CREATE A POST */
export const createPost = async (req, res) => {
    try {
        console.log('Inside createPost function');
        const { userId, description, picturePath } = req.body;
        const user = User.findById(userId);
        const newPost = new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            userPicturePath: user.picturePath,
            picturePath: req.file.path,
            likes: {},
            comments: []
        });
        await newPost.save();
        //find all posts to return to the UI
        const posts = await Post.find();
        res.status(201).json({ data: posts });
    } catch (error) {
        console.log(`error - ${error}`);
        res.status(500).json({ error: error });
    }
}


/* GET HOME PAGE FEED FOR THE LOGINED USER */
export const getFeedPosts = async (req, res) => {
    try {
        console.log('Inside getFeedPosts function');
        const posts = await Post.find();
        res.status(200).json({ data: posts });
    } catch (error) {
        console.log(`error - ${error}`);
        res.status(500).json({ error: error });
    }
}


/* GET ALL FEEDS OF A CERTAIN USER */
export const getUserPosts = async (req, res) => {
    try {
        console.log('Inside getUserPosts function');
        const { id } = req.params;
        console.log(`finding all posts of user ${id}`);
        const posts = await Post.find(id);
        res.status(200).json({ data: posts });
    } catch (error) {
        console.log(`error - ${error}`);
        res.status(500).json({ error: error });
    }
}


/* LIKE/UNLIKE A USER'S POST */
export const likePost = async (req, res) => {
    try {
        console.log('Inside likePost function');
        const { postId } = req.params;
        const { userId } = req.body;
        console.log(`Like/Unlike post ${postId} by user ${userId}`);
        const post = await Post.findById(postId);
        const isLiked = post.likes.get(userId);

        if (isLiked) {
            //unliking the post
            console.log('Unliking the post');
            post.likes.delete(userId);
        } else {
            //liking the post
            console.log('Liking the post');
            post.likes.set(userId, true);
        }

        const updatePost = await Post.findByIdAndUpdate(
            id,
            { likes: post.likes },
            { new: true }
        );

        res.status(200).json({ updatePost });
    } catch (error) {
        console.log(`error - ${error}`);
        res.status(500).json({ error: error });
    }
}