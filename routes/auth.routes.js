const express = require("express");
const {
  signup,
  login,
  logout,
  verifyEmail,
  resendVerificationMail,
  roleSelect,
  updateLocation
} = require("../controllers/auth.controller.js");


const router = express.Router();

router.post("/login", login);

router.post("/signup", signup);

router.get("/verify", verifyEmail);

router.post("/logout", logout);

router.post("/resendVerification", resendVerificationMail);

router.post('/roleSelect', roleSelect);

router.post('/updateLocation', updateLocation);

module.exports = router;
