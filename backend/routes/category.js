const express = require("express");

const categories = express.Router();

categories.get("/", (req, res) => {
  req.context.CategoryData.find((err, categories) => {
    if (err) {
      return res.json(err);
    }

    return res.json(categories);
  });
});

module.exports = { categories };
