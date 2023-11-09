import { AuthorRequest, User } from "../models/index.js";
import catchAsync from "../utils/catchAsync.js";

const createUser = catchAsync(async (req, res) => {
  const { name, email } = req.body;
  const user = await User.create({ name, email });
  res.json({ user });
});

const getUser = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const user = await User.findById(userId);
  res.json({ user });
});

const requestToBeAuthor = catchAsync(async (req, res) => {
  const { user, questions, qualification, experience } = req.body;
  const request = await AuthorRequest.create({
    user,
    questions,
    qualification,
    experience,
  });
  res.json({ request });
});

export { createUser, getUser, requestToBeAuthor };
