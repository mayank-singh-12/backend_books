const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  title: String,
  author: String,
  publishedYear: Number,
  genre: [{ type: String }],
  language: String,
  country: String,
  rating: Number,
  summary: String,
  coverImageUrl: String,
});

const Book = mongoose.model("Book", BookSchema);

module.exports = Book;
