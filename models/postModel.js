import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    body: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          if (value.length <= 3) {
            return false;
          }
        },
        message: "Min length needed is 4",
      },
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    featuredImage: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

postSchema.pre("save", async function (next) {
  this.slug = this.title.split(" ").join("-");
  next();
});

const Post = mongoose.model("Post", postSchema);

export default Post;
