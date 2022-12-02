const express = require("express");
const http = require("http");
const path = require("path");
const logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const { BookmarkSchema } = require("./schemas/bookmark");
const { CategorySchema } = require("./schemas/category");
const { bookmarks } = require("./routes/bookmark");
const { categories } = require("./routes/category");

/**
 * @param {string} dbURI
 */
function createDBConnection(dbURI) {
  mongoose.connect(dbURI, {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  mongoose.connection.on("error", (error) => {
    console.error("DB Connection Error", error);
  });

  mongoose.connection.once("open", () => {
    console.log("DB Connected");
  });

  const BookmarkData = mongoose.model("bookmarks", BookmarkSchema);
  const CategoryData = mongoose.model("categories", CategorySchema);

  return {
    BookmarkData,
    CategoryData,
  };
}

/**
 * @param {string} host
 * @param {number} port
 */
function createServer(host, port) {
  const app = express();

  app.use(logger("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(express.static(path.join(__dirname, "..", "dist")));

  app.use(
    cors({
      origin: ["http://127.0.0.1:4200", "http://127.0.0.1"],
    })
  );

  const { BookmarkData, CategoryData } = createDBConnection(
    `mongodb://${process.env["DB_USERNAME"]}:${process.env["DB_PASSWORD"]}@127.0.0.1:27017/nest?authSource=admin`
  );

  // Share db context
  app.use(function (req, _res, next) {
    req.context = {
      BookmarkData,
      CategoryData,
    };
    next();
  });

  // Define routes
  app.use("/api/bookmarks", bookmarks);
  app.use("/api/categories", categories);

  // Catch all other routes and return the index file
  app.use("*", (_req, res) => {
    res.redirect("/");
  });

  return http
    .createServer(app)
    .listen({
      host,
      port,
    })
    .on("listening", () => {
      console.log(`Server is running at http://${host}:${port}`);
    })
    .on("error", (error) => {
      console.log("Server Error");

      if (error.stack) {
        console.log(error.stack);
      }
    });
}

createServer(
  process.env["HOST"] || "127.0.0.1",
  Number(process.env["PORT"] || 80)
);
