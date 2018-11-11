// Imports
const express       = require('express');
const app           = express();
const path          = require('path');
const bodyParser    = require("body-parser");
const mongoose      = require('mongoose'); // Mongoose Import
const cors          = require('cors');



// CORS Error Fix
app.use(cors());

// JSON BodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Mongoose DB Connection
const MLabURL = 'mongodb://jV5H6Gv8gEcs9Fwy:bAxrRtY8mrEZv59sW27a@ds159073.mlab.com:59073/drqp-nest';
mongoose.connect(MLabURL, { useNewUrlParser: true });
  var MLABtest = mongoose.connection;
    MLABtest.on('error', console.error.bind( console, 'MLAB CONNECTION ERROR' ));
    MLABtest.once('open', function() { console.log('MLAB CONNECTED') });
  var Schema = mongoose.Schema;

  /* Schemma Definition */
  var bookmarksSchema = new Schema({
    title: String,
    href: String,
    description: String,
    category: String
  });
  var categorySchema = new Schema({
    name: String,
  });

  var BookmarkData = mongoose.model('bookmarks', bookmarksSchema);
  var CategoryData = mongoose.model('categories', categorySchema);



// Reads
  app.get('/api/bookmarks', function (req, res) {
    BookmarkData.find(function (err, bookmarks) {
      if(err) {
        res.send(err)
      }
      res.json(bookmarks);
      console.log("Reading BookmarkData");
    });
  });
  app.get('/api/bookmark/categories', function (req, res){
    CategoryData.find( function (err, categories){
      if(err) {
        res.send(err)
      }
      res.send(categories);
      console.log("Reading CategoryData");
    });
  });



// Create
  app.post('/api/bookmarks', function (req, res) {
    BookmarkData.create({
        title : req.body.title,
        href : req.body.href,
        description : req.body.description,
        category : req.body.category,
    })
    console.log("Inserting BookmarkData");
  });


// Update
  app.put('/api/bookmarks/:id', function(req,res){
    BookmarkData.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
      if (err) {
        return next(err);
      }
      res.json(post);
      console.log("Updating BookmarkData");
    });
  })



// Delete
  app.delete('/api/bookmarks/:id', function(req,res){
    BookmarkData.deleteOne({ _id: req.params.id }, 
      function (err) { 
        console.log("Error Deleting BookmarkData"); 
      }
    );
  })



// Server Start
var server = app.listen(8081, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Server Live = http://%s:%s", host, port);
})
