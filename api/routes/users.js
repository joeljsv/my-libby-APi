// const express = require("express");
// const router = express.Router();

// const UserController = require('../controllers/users');
// const checkAuth = require('../middleware/check-auth');

// router.post("/signup", UserController.user_signup);

// router.post("/login", UserController.user_login);

// router.delete("/:userId", checkAuth, UserController.user_delete);

// module.exports = router;
const express = require("express");
const router = express.Router();

const User= require("../controllers/users")

router.post("/create",User.createUsre),
router.get("/get",User.user_get),
router.post("/login",User.user_login),

module.exports=router