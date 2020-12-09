const mongoose = require('mongoose');
const { DependentHostedNumberOrderPage } = require('twilio/lib/rest/preview/hosted_numbers/authorizationDocument/dependentHostedNumberOrder');

const libbyUser = mongoose.Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    name:{
        type:String,
        required:true,
        maxlength:32,
        trim:true
    },
    password:{
        type:String,
    },
    lastname:{
        type:String,
        maxlength:32,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        maxlength:32,
        trim:true
    },
    roll:{
        type:String,
        required:true,
        unique:true,
        maxlength:32,
        trim:true
    },
    phone:{
        type:Number,
        required:true,
        unique:true,
        maxlength:10
    },
    booksPicked:{
        type:String,
    },
    booksReturned:{
        type:String,
    },
    booksPending:{
        type:String,
    },
    booksFine:{
        type:Number,
        default:0
    },
 
});

module.exports = mongoose.model('LibbyUser', libbyUser);