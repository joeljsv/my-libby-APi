const User =require("../models/users");
const { body, validationResult, check } = require('express-validator');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');

exports.signout =(req, res )=>{
    res.clearCookie("token")
    res.json({
        message:"you are signout"
    })
}

exports.signup =(req, res )=>{

    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(422).json({
            error:errors.array()[0].msg
        })
    }


    const user = new User(req.body);
    user.save((err,user)=>{
        if(err){
            console.log(err)
            return res.status(400).json({
                err:"something went wrong"
            })
        }
        res.json({
            name:user.name
        })
    })
}