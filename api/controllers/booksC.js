const mongoose = require("mongoose");
const Book = require("../models/book");

exports.books_get_all = (req, res, next) => {
  Book.find()
    .select("name price _id author cat avilable takenby addeddate")
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        // books: docs.map(doc => {
        //   return {
        //     // name: doc.name,
        //     // price: doc.price,
        //     // bookImage: doc.bookImage,
        //     // _id: doc._id,
        //     doc,
        //     request: {
        //       type: "GET",
        //       url: "http://localhost:3000/books/" + doc._id
        //     }
        //   };
        // }
        // )
        books:docs,
      };
      //   if (docs.length >= 0) {
      res.status(200).json(response);
      //   } else {
      //       res.status(404).json({
      //           message: 'No entries found'
      //       });
      //   }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.books_create_book = (req, res, next) => {
  console.log(req.body);
  var d = new Date();
var date =d.toISOString();
  const book = new Book({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
    // bookimg: req.file.path,
    author: req.body.author,
    cat: req.body.cat,
    avilable: req.body.avilable,
    takenby: req.body.takenby,
    addeddate: date,
  });
  book
    .save()
    .then(result => {
      console.log(result);
      res.sendFile('index.html', {root: __dirname })
      // res.status(201).json({
      //   message: "Created book successfully",
      //   createdbook: {
      //     name: result.name,
      //     price: result.price,
      //     _id: result._id,
      //     request: {
      //       type: "GET",
      //       url: "http://localhost:3000/books/" + result._id
      //     }
      //   }
      // });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.books_get_book = (req, res, next) => {
  const id = req.params.bookId;
  Book.findById(id)
    // .select("name price _id bookImage")
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json({
          book: doc,
          request: {
            type: "GET",
            url: "http://localhost:3000/books"
          }
        });
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

exports.books_update_book = (req, res, next) => {
  const id = req.params.bookId;
  console.log(id);
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Book.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "book updated",
        request: {
          type: "GET",
          url: "http://localhost:3000/books/" + id
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.books_delete = (req, res, next) => {
  const id = req.params.bookId;
  Book.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "book deleted",
        request: {
          type: "POST",
          url: "http://localhost:3000/books",
          body: { name: "String", price: "Number" }
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};