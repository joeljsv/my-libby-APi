const mongoose = require('mongoose');


const bookSchema = mongoose.Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    price: { type: Number,},
    // bookimg: { type: String, required: true },
    author: { type: String, required: true },
    cat: { type: String, required: true },
    avilable: { type: Boolean,  default:true },
    takenby: { type: String, },
    addeddate: { type: String, required: true },

});

module.exports = mongoose.model('Books', bookSchema);