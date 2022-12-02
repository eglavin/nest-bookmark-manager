const express = require("express");

const bookmarks = express.Router();

bookmarks.get("/", (req, res) => {
  req.context.BookmarkData.find((err, bookmarks) => {
    if (err) {
      return res.json(err);
    }

    return res.json(bookmarks);
  });
});

bookmarks.get("/:_id", (req, res) => {
  req.context.BookmarkData.find({ _id: req.params._id }, (err, bookmark) => {
    if (err) {
      return res.json(err);
    }

    return res.json(bookmark);
  });
});

bookmarks.post("/", (req, res) => {
  try {
    req.context.BookmarkData.create({
      title: req.body.title,
      href: req.body.href,
      description: req.body.description,
      category: req.body.category,
    });

    console.log(`Inserted: ${req.body.title}`);
    return res.json({ response: `Inserted: ${req.body.title}` });
  } catch (error) {
    console.log(`Insert Error: ${req.body.title}`);
    return res.json({ response: `Insert Error: ${req.body.title}` });
  }
});

bookmarks.put("/:id", (req, res) => {
  req.context.BookmarkData.findByIdAndUpdate(
    req.params.id,
    req.body,
    (err, post) => {
      if (err) {
        console.log(`Update Error: ${req.body.title}`);
        return res.json(err);
      }

      console.log(`Updated: ${req.body.title}`);
      return res.json({ response: `Updated: ${req.body.title}` });
    }
  );
});

bookmarks.delete("/:id", (req, res) => {
  req.context.BookmarkData.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      console.log(`Delete Error: ${req.params.id}`);
      return res.json(err);
    }

    console.log(`Deleted: ${req.params.id}`);
    return res.json({ response: `Deleted: ${req.params.id}` });
  });
});

module.exports = { bookmarks };
