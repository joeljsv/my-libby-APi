const mongoose = require('mongoose');


const bookOrderSchema = mongoose.Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    book: { type: mongoose.Schema.Types.ObjectId, ref: 'Books', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'LibbyUser', required: true },
    takenDate: { type: String, required: true },
    status: { type: String, required: true },
    returnDate: { type: String,},


});

module.exports = mongoose.model('BooksOrders', bookOrderSchema);