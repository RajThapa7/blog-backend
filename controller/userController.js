const AuthorRequest = require("../models/authorRequestModel");
const User = require("../models/userModel");
const errorHandler = require("../utils/errorHandler");

const createUser = async (req, res) => {
  const { name, email } = req.body;
  try {
    const user = await User.create({ name, email });
    res.json({ user });
  } catch (error) {
    const err = errorHandler(error);
    res.status(400).json({ err });
  }
};

const getUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    res.json({ user });
  } catch (error) {
    const err = errorHandler(error);
    res.status(400).json({ err });
  }
};

const requestToBeAuthor = async (req, res) => {
  const { user, questions, qualification, experience } = req.body;
  try {
    const request = await AuthorRequest.create({
      user,
      questions,
      qualification,
      experience,
    });
    res.json({ request });
  } catch (error) {
    const err = errorHandler(error);
    res.status(400).json({ err });
  }
};

module.exports = { createUser, getUser, requestToBeAuthor };
