import mongoose from "mongoose";
const { Schema, model } = mongoose;

const CommentSchema = new Schema({
  headline: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    required: true,
  },
});

const Comment = model("Comment", CommentSchema);
export default Comment;
