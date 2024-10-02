const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  user: {
    type: String,
    required: [true, "User is required."],
  },
  commentText: {
    type: String,
    required: [true, "Comment text is required."],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required."],
  },
  director: {
    type: String,
    required: [true, "Director is required."],
  },
  year: {
    type: Number,
    required: [true, "Year is required."],
    min: [1888, "Year must be after 1888"], // First movie is from 1888
  },
  description: {
    type: String,
    required: [true, "Description is required."],
  },
  genre: {
    type: String,
    required: [true, "Genre is required."],
  },
  comments: [commentSchema], // Subdocument array for comments
});

module.exports = mongoose.model("Movie", movieSchema);
