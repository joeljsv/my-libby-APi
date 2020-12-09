const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");
const jwt = require("jsonwebtoken");

const User = require("../models/users");



exports.user_login = (req, res, next) => {
    console.log(req.body.email)
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(501).json({
                    message: "Invalid Email"
                });
            }
            // bcrypt.compare(req.body.password, user[0].password, (err, result) => {
            //     if (err) {
            //         console.log(err)
            //         return res.status(402).json({
            //             message: "Auth failed"
            //         });
            //     }
            if (req.body.password === user[0].password) {
                const token = jwt.sign(
                    {
                        email: user[0].email,
                        userId: user[0]._id
                    },
                    process.env.JWT_KEY,
                    {
                        expiresIn: "1h"
                    }
                );
                return res.status(200).json({
                    message: "Auth successful",
                    token: token,
                    user: user[0],
                });
            } else
                res.status(501).json({
                    message: "Incorrect Password"
                });
            // });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

exports.user_get = (req, res, next) => {
    console.log(req.body)
    User.find().select("name lastname email roll phone booksFine")
        .exec().then(user => res.status(201).json({ user }))
};


// const User = require("../models/users");

exports.createUsre = (req, res, next) => {
    console.log(req.body);
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length >= 1) {
                return res.status(409).json({
                    message: "Mail exists"
                });
            } else {
                const user = new User({
                    // _id: new mongoose.Types.ObjectId(),
                    // email: req.body.email,
                    name: req.body.name,
                    lastname: req.body.lastname,
                    email: req.body.email,
                    phone: req.body.phone,
                    roll: req.body.roll,
                    password: req.body.password,
                });
                user
                    .save()
                    .then(result => {
                        console.log(result);
                        res.sendFile('index.html', { root: __dirname })
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({
                            error: err
                        });
                    });
            }
        });
};