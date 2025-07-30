import mongoose from "mongoose";
const commentSchema = new mongoose.Schema({
  author: String,
  text: String,
  createdAt: { type: Date, default: Date.now },
});

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      required: true,
    },
    authorName: {
      type: String,
      required: true,
    },
    savedBy: {
      type: [String],
      default: [],
    },
    comments: [commentSchema],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

blogSchema.pre("save", function (next) {
  this.primaryTag = this.tags?.[0] || "General";
  next();
});

export const Blog = mongoose.model("Blog", blogSchema);
