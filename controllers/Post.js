const Post = require("../models/Post");
const User = require("../models/User");

exports.createPost = async (req, res) => {
    try {
        const { title, body, active, geolocation } = req.body;
        const userId = req.user.id
        const newPost = new Post({
            title,
            body,
            createdBy: userId,
            active,
            geolocation
        });

        // create Post
        const post = await newPost.save();

        // update user
        const user = await User.findByIdAndUpdate(userId,
            {
                $push: {
                    post: newPost._id,
                }
            }, { new: true })

        return res.status(201).json({
            success: true,
            message: "Post created successfully",
            data: post,
        });
    } catch (err) {
        return res.status(500).json(
            {
                success: false,
                message: "Failed to create the post",
                error: err.message
            }
        );
    }
};

exports.getPosts = async (req, res) => {
    try {
        const userId = req.user.id
        const posts = await User.findById(userId, { post: true }).populate('post').exec();
        return res.status(201).json({
            success: true,
            message: "All post fetched successfully",
            data: posts,
        });
    } catch (err) {
        return res.status(500).json(
            {
                success: false,
                message: "Failed to fetched all the posts",
                error: err.message
            }
        );
    }
};

exports.getPost = async (req, res) => {
    try {
        const postId = req.params.id;
        const userId = req.user.id;
        const post = await Post.findOne({ _id: postId, createdBy: userId });
        if (!post) {
            return res.status(404).json(
                {
                    success: false,
                    message: 'Post not found'
                }
            );
        }
        return res.status(201).json({
            success: true,
            message: "Post fetched successfully",
            data: post,
        });
    } catch (err) {
        return res.status(500).json(
            {
                success: false,
                message: "Failed to fetched the post",
                error: err.message
            }
        );
    }
};

exports.updatePost = async (req, res) => {
    try {
        const{title, body,active, geolocation} = req.body;
        const postId = req.params.id;
        const userId = req.user.id;
        const post = await Post.findOneAndUpdate(
            { _id: postId, createdBy: userId },
            {
                title,
                body,
                active,
                geolocation
            },
            { new: true }
        );
        if (!post) {
            return res.status(404).json(
                {
                    success: false,
                    message: 'Post not found'
                }
            );
        }
        return res.status(201).json({
            success: true,
            message: "Post updated successfully",
            data: post,
        });
    } catch (err) {
        return res.status(500).json(
            {
                success: false,
                message: "Failed to update the post",
                error: err.message
            }
        );
    }
};

exports.deletePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const userId = req.user.id;
        const post = await Post.findOneAndDelete({ _id: postId, createdBy: userId });
        if (!post) {
            return res.status(404).json(
                {
                    success: false,
                    message: 'Post not found'
                }
            );
        }
        // updated the user
        const user = await User.findByIdAndUpdate(userId,
            {
                $pull: {
                    post: postId,
                }
            }, { new: true }).populate('post').exec();

        res.status(201).json({
            success: true,
            message: "Post deleted successfully",
            data: user,
        });
    } catch (err) {
        return res.status(500).json(
            {
                success: false,
                message: "Failed to delete the post",
                error: err.message
            }
        );
    }
};