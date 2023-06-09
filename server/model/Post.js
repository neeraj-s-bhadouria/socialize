import mongoose, { Schema } from "mongoose";

const postSchema = new mongoose.Schema({
    userId: {
        type: String,
        requied: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        rewuired: true
    },
    location: String,
    description: String,
    picturePath: String,
    userPicturePath: String,
    likes: {
        type: Map,
        of: Boolean
    },
    comments: {
        type: Array,
        default: []
    }
}, { timestamps: true } 
);

const Post = mongoose.model("Post", postSchema);

export default Post;