const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      required: [true, "Role is needed"],
    },
    roleId: {
      type: Number,
      required: [true, "RoleId is needed"],
    },
  },
  {
    timestamps: true,
  }
);

const Role = mongoose.model("Role", roleSchema);

module.exports = Role;
