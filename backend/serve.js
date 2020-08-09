const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

// CORS Error Fix
app.use(
  cors({
    origin: ["http://127.0.0.1:4200", "http://127.0.0.1"],
  })
);

// JSON BodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Mongoose DB Connection
const username = "jV5H6Gv8gEcs9Fwy";
const password = "bAxrRtY8mrEZv59sW27a";
const MLabURL = `mongodb://${username}:${password}@ds159073.mlab.com:59073/drqp-nest`;
mongoose.connect(MLabURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

// DB Test
var dbConnectionTest = mongoose.connection;
dbConnectionTest.on(
  "error",
  console.error.bind(console, "MLAB Connection Error")
);
dbConnectionTest.once("open", () => {
  console.log("MLAB Connected");
});

// Schema Definition
var bookmarksSchema = new mongoose.Schema({
  title: String,
  href: String,
  description: String,
  category: String,
  catname: String,
});
var categorySchema = new mongoose.Schema({
  name: String,
});

var BookmarkData = mongoose.model("bookmarks", bookmarksSchema);
var CategoryData = mongoose.model("categories", categorySchema);

app.use(express.static(path.join(__dirname, "../dist/")));
app.use("/", express.static("../dist/"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/", "index.html"));
});

// Create
app.post("/api/bookmarks", (req, res) => {
  try {
    BookmarkData.create({
      title: req.body.title,
      href: req.body.href,
      description: req.body.description,
      category: req.body.category,
      catname: req.body.catname,
    });

    console.log(`Inserted: ${req.body.title}`);
    return res.json({ response: `Inserted: ${req.body.title}` });
  } catch (error) {
    console.log(`Insert Error: ${req.body.title}`);
    return res.json({ response: `Insert Error: ${req.body.title}` });
  }
});

// Reads
app.get("/api/bookmarks", (req, res) => {
  BookmarkData.find((err, bookmarks) => {
    if (err) {
      return res.send(err);
    }
    return res.json(bookmarks);
  });
});
app.get("/api/bookmarks/:_id", (req, res) => {
  BookmarkData.find({ _id: req.params._id }, (err, bookmark) => {
    if (err) {
      return res.send(err);
    }
    return res.json(bookmark);
  });
});
app.get("/api/bookmark/categories", (req, res) => {
  CategoryData.find((err, categories) => {
    if (err) {
      return res.send(err);
    }
    return res.json(categories);
  });
});

// Update
app.put("/api/bookmarks/:id", (req, res) => {
  BookmarkData.findByIdAndUpdate(req.params.id, req.body, (err, post) => {
    if (err) {
      console.log(`Update Error: ${req.body.title}`);
      return res.send(err);
    }

    console.log(`Updated: ${req.body.title}`);
    return res.json({ response: `Updated: ${req.body.title}` });
  });
});

// Delete
app.delete("/api/bookmarks/:id", (req, res) => {
  BookmarkData.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      console.log(`Delete Error: ${req.params.id}`);
      return res.send(err);
    }
    console.log(`Deleted: ${req.params.id}`);
    return res.json({ response: `Deleted: ${req.params.id}` });
  });
});

app.use("*", (req, res) => {
  res.redirect("/");
});

// Server Start
var server = app.listen(80, () => {
  var host = server.address().address;
  var port = server.address().port;

  console.log("Server Live = http://%s:%s", host, port);
});
