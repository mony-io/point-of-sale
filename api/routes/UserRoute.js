const express = require("express");
const Users = require("../controllers/UserController");
const router = express.Router();
const token = require("../controllers/RefreshToken");
const verifyToken = require("../middlewares/VerifyToken");

router.get("/users", Users.findAll);
router.post("/user", Users.create);
router.post("/login", Users.UserLogin);
router.get("/logout", Users.logout);
router.get("/token", token.refreshToken);
router.put("/token/:id", Users.deleteToken);
router.post("/reset_password_mail", Users.resetpassword_mail);
router.get("/forgotpassword/:id/:token", Users.forgotpassword);
router.put("/forgotpassword/:id/:token", Users.updatePassword);
router.put("/change-password/:id", Users.changePassword);
module.exports = router;
