const accountSid = 'AC67d608921b548437975772d9c0b21f58';
const authToken = '21c86c380c8ad22ee6b7d596bc1126f5';
const client = require('twilio')(accountSid, authToken);
const service = "VAb494a19cab6f1a17b7a296b05eda8f94";

const {signout, signup} = require("../controllers/auth")
const { body, validationResult, check } = require('express-validator');

const express = require("express");
const router = express.Router();
router.post("/", (req, res, next) => {
    console.log(req.body.email)
    client.verify.services(service)
        .verifications
        .create({ to: req.body.email, channel: 'email' })
        .then(verification => {
            console.log(verification.status)
            res.status(200).json({
                verification
            })
        }).catch(err => {
            console.log(err),
                res.status(500).json({
                    err: err
                });
        })
});

router.post("/phone", (req, res, next) => {
    console.log(req.body.phone);
    client.verify.services(service)
        .verifications
        .create({ to: '+91' + req.body.phone, channel: 'sms' })
        .then((verification) => {
            console.log(verification.status); res.status(200).json({
                status: "ok"
            })
        }).catch(err => {
            console.log(err);
            res.status(401).json({
                status: "failed",

            });
        });
});
router.post("/call", (req, res, next) => {
    console.log(req.body.phone);
    client.verify.services(service)
        .verifications
        .create({ to: '+91' + req.body.phone, channel: 'call' })
        .then((verification) => {
            console.log(verification.status); res.status(200).json({
                status: "ok"
            })
        }).catch(err => {
            res.status(401).json({
                status: "failed",

            });
        });
});

router.post("/phone/verify", (req, res, next) => {
    console.log("otp" + req.body.phone);
    client.verify.services(service)
        .verificationChecks
        .create({ to: '+91' + req.body.phone, code: req.body.otp })
        .then(verification_check => {
            console.log(verification_check.status);
            res.status(200).json({
                status: verification_check.status
            })
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                status: "failed"
            })
        });
});
router.post("/confirm", (req, res, next) => {
    console.log("otp" + req.body.phone);
    client.calls
        .create({
            url: 'http://demo.twilio.com/docs/voice.xml',
            to: '+917034445301',
            from: '+12147538001'
        })
        .then(call => {
            console.log(call.sid);
            res.status(200).json({
                status: "ok"
            })
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                status: "failed"
            })
        });
});


router.post("/signup",[
    check("name","name must be 3 chara").isLength({min:3}),
    check("email","enter valid email").isEmail(),
],signup)


router.get("/signout",signout)


module.exports = router;