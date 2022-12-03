const express = require("express");

const routes = express.Router();

routes.get("/", async function (req, res) {
  try {
    const bookmarks = await req.context.BookmarkData.find({}).exec();

    return res.json(bookmarks);
  } catch (error) {
    return res.status(500).json({
      message: "Error loading bookmarks",
      error,
    });
  }
});

routes.get("/byCategory", async function (req, res) {
  try {
    const bookmarks = await req.context.BookmarkData.find(
      req.query["id"] ? { category: req.query["id"] } : {} // If category is null, return all.
    ).exec();

    return res.json(bookmarks);
  } catch (error) {
    return res.status(500).json({
      message: "Error loading bookmarks",
      error,
    });
  }
});

routes.get("/:_id", async function (req, res) {
  try {
    const bookmark = await req.context.BookmarkData.findById(
      req.params._id
    ).exec();

    if (!bookmark) {
      return res.json({
        message: "Bookmark not found",
      });
    }

    return res.json(bookmark);
  } catch (error) {
    return res.status(500).json({
      message: "Error loading bookmark",
      error,
    });
  }
});

routes.post("/", async function (req, res) {
  try {
    const newBookmark = await req.context.BookmarkData.create({
      title: req.body.title,
      href: req.body.href,
      description: req.body.description,
      category: req.body.category,
    });

    return res.json(newBookmark);
  } catch (error) {
    return res.status(500).json({
      message: `Unable to create "${req.body?.title || ""}"`,
      error,
    });
  }
});

routes.put("/:_id", async function (req, res) {
  try {
    const updatedBookmark = await req.context.BookmarkData.findByIdAndUpdate(
      req.params._id,
      req.body,
      {
        new: true,
      }
    );

    return res.json(updatedBookmark);
  } catch (error) {
    return res.status(500).json({
      message: `Unable to update "${req.body?.title || ""}"`,
      error,
    });
  }
});

routes.delete("/:_id", async function (req, res) {
  try {
    const deletedBookmark = await req.context.BookmarkData.deleteOne({
      _id: req.params._id,
    });

    return res.json(deletedBookmark);
  } catch (error) {
    return res.status(500).json({
      message: `Unable to delete "${req.body?.title || ""}"`,
      error,
    });
  }
});

module.exports = { bookmarks: routes };
