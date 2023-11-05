const AuthorRequest = require("../models/authorRequestModel");
const Role = require("../models/roleModel");
const User = require("../models/userModel");

const createRole = async (req, res) => {
  const { role, roleId } = req.body;
  const roles = await Role.create({
    role,
    roleId,
  });
  res.json({ roles });
};

const editUserRole = async (req, res) => {
  const { userId, roleId } = req.body;
  const user = await User.findByIdAndUpdate(userId, { roleId });
  res.json({ user });
};

const getAllUsers = async (req, res) => {
  const users = await User.find({});
  res.json({ users });
};

const deleteUser = async (req, res) => {
  const { userId } = req.params;
  const user = await User.findByIdAndDelete(userId);
  res.json({ msg: "Deleted Successfully" });
};

const getAuthorRequestList = async (req, res) => {
  const requestList = await AuthorRequest.find({}).populate(
    "user",
    "name email roleId"
  );
  res.json(requestList);
};

const verifyAuthorRequest = async (req, res) => {
  const { id } = req.body;

  const verifyAuthorRequest = await AuthorRequest.findById(id);
  const verifiedAuthorUser = await User.findByIdAndUpdate(
    verifyAuthorRequest.user,
    { roleId: 3 }
  );
  await AuthorRequest.findByIdAndDelete(id);
  res.json(verifiedAuthorUser);
};

module.exports = {
  createRole,
  editUserRole,
  deleteUser,
  getAllUsers,
  getAuthorRequestList,
  verifyAuthorRequest,
};
