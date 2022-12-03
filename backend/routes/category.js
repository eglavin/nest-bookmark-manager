const express = require("express");

const routes = express.Router();

routes.get("/", async function (req, res) {
  try {
    const categories = await req.context.CategoryData.find({}).exec();

    return res.json(categories);
  } catch (error) {
    return res.status(500).json({
      message: "Error loading categories",
      error,
    });
  }
});

module.exports = { categories: routes };
