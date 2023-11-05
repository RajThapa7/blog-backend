const Comment = require("../models/commentModel");
const Post = require("../models/postModel");
const catchAsync = require("../utils/catchAsync");

const createPost = catchAsync(async (req, res) => {
  const { title, body, author, featuredImage, isPublished } = req.body;
  const post = await Post.create({
    title,
    body,
    author,
    featuredImage,
    ...(isPublished && { isPublished }),
  });
  res.json({ post });
});

const getAllPost = async (req, res) => {
  const posts = await Post.find({}).populate("author", "name email");
  res.json({ posts });
};

const addComment = catchAsync(async (req, res) => {
  const { content, creator, post, replies } = req.body;
  const comment = await Comment.create({
    content,
    creator,
    post,
    replies,
  });
  res.json(comment);
});

const replyToComment = async (req, res) => {
  const { content, creator, post, replyingTo } = req.body;
  const reply = await Comment.create({ content, creator, post });
  await Comment.findByIdAndUpdate(replyingTo, {
    $push: { replies: reply },
  });
  res.json(reply);
};

const getCommentsOnPost = async (req, res) => {
  const { postId } = req.params;
  const comments = await Comment.find({ post: postId }).populate("replies");
  res.json(comments);
};

const getComment = async (req, res) => {
  const { commentId } = req.params;
  const comment = await Comment.findById(commentId);
  res.json(comment);
};

module.exports = {
  createPost,
  replyToComment,
  getAllPost,
  addComment,
  getCommentsOnPost,
  getComment,
};
