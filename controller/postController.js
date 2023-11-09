const Comment = require("../models/commentModel");
const Post = require("../models/postModel");
const catchAsync = require("../utils/catchAsync");
const {
  upload,
  imageUpload,
  deleteImageFromCloud,
} = require("../utils/cloudinary");

const createPost = async (req, res, next) => {
  const { title, body, author, isPublished } = req.body;
  const cloudFile = await imageUpload(req, res);
  try {
    const post = await Post.create({
      title,
      body,
      author,
      featuredImage: cloudFile,
      ...(isPublished && { isPublished }),
    });
    res.json(post);
  } catch (error) {
    await deleteImageFromCloud(cloudFile);
    next(error);
  }
};

const getAllPost = catchAsync(async (req, res) => {
  const posts = await Post.find({}).populate("author", "name email");
  res.json({ posts });
});

const getPost = catchAsync(async (req, res) => {
  const { postId } = req.params;
  const post = await Post.findById(postId);
  res.json(post);
});

const addComment = catchAsync(async (req, res) => {
  const { content, creator, post, replies, isReply, replyingTo } = req.body;
  const comment = await Comment.create({
    content,
    creator,
    post,
    replies,
    isReply,
  });
  //if the comment is a reply then we will push the id of the created comment
  // to the replies array of the comment, the new comment is replying to
  if (isReply) {
    await Comment.findByIdAndUpdate(replyingTo, {
      $push: { replies: comment },
    });
  }
  res.json(comment);
});

const getCommentsOnPost = catchAsync(async (req, res) => {
  const { postId } = req.params;
  const comments = await Comment.find({
    post: postId,
    isReply: false,
  });
  res.json(comments);
});

const getRepliesOfComment = catchAsync(async (req, res) => {
  const { commentId } = req.params;
  const comment = await Comment.findById(commentId).populate("replies");
  res.json(comment.replies);
});

const getComment = catchAsync(async (req, res) => {
  const { commentId } = req.params;
  const comment = await Comment.findById(commentId);
  res.json(comment);
});

module.exports = {
  createPost,
  getAllPost,
  getPost,
  addComment,
  getCommentsOnPost,
  getRepliesOfComment,
  getComment,
};
