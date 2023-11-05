const mongoose = require("mongoose");

const authorRequestSchema = new mongoose.Schema({
  questions: {
    type: Map,
    of: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const AuthorRequest = mongoose.model("AuthorRequest", authorRequestSchema);

module.exports = AuthorRequest;
