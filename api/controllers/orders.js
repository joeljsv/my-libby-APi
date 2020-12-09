const mongoose = require("mongoose");

const Order = require("../models/orders");
const Books = require("../models/book");

exports.orders_get_all = (req, res, next) => {
  Order.find()
    // .select("book quantity _id")
    .populate("book",).populate('user')
    .exec()
    .then(docs => {
      res.status(200).json({
        count: docs.length,
        orders: docs.map(doc => {
          return {
            status: doc.status,
            _id: doc._id,
            book: doc.book,
            user: doc.user,
            quantity: doc.quantity,
            request: {
              type: "GET",
              url: "http://localhost:3000/orders/" + doc._id
            }
          };
        })
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

exports.orders_create_order = (req, res, next) => {
  console.log(req.body)
  Books.findById(req.body.bookId)
    .then(book => {
      if (!book) {
        return res.status(404).json({
          message: "book not found"
        });
      }
      var d = new Date();
      var date = d.toISOString();
      const order = new Order({
        // _id: mongoose.Types.ObjectId(),
        user: req.body.userid,
        book: req.body.bookId,
        status: "pending",
        takenDate: date
      });
      upd = {
        takenby: req.body.username,
        avilable: false,
      }
      Books.updateOne({ "_id": req.body.bookId }, { $set: upd }).exec().then(res => {
        return order.save();
      }).then(result => {
        console.log(result);
        res.status(201).json({
          satus: "ok",
          message: "Order stored",
          createdOrder: {
            // _id: result._id,
            book: result.book,
            quantity: result.quantity
          },
          request: {
            type: "GET",
            url: "http://localhost:3000/orders/" + result._id
          }
        });
      });


    })

    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.orders_get_user = (req, res, next) => {
  Order.find({ 'user': req.params.userid })
    // .select("book quantity _id")
    .populate("book",)
    .exec()
    .then(docs => {

      res.status(200).json({
        count: docs.length,
        status: "ok",

        orders: docs.map(doc => {
          return {
            status: doc.status,
            _id: doc._id,
            book: doc.book,
            // user:doc.user,
            // quantity: doc.quantity,

          };
        }),
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};



exports.orders_get_order = (req, res, next) => {
  Order.findById(req.params.orderId)
    .populate("book")
    .exec()
    .then(order => {
      if (!order) {
        return res.status(404).json({
          message: "Order not found"
        });
      }
      res.status(200).json({
        order: order,
        request: {
          type: "GET",
          url: "http://localhost:3000/orders"
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};




exports.orders_delete_order = (req, res, next) => {
  Order.remove({ _id: req.params.orderId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Order deleted",
        request: {
          type: "POST",
          url: "http://localhost:3000/orders",
          body: { bookId: "ID", quantity: "Number" }
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};