const mongoose = require("mongoose");

const BookmarkSchema = new mongoose.Schema({
  title: String,
  href: String,
  description: String,
  category: String,
});

module.exports = { BookmarkSchema };
