const express = require("express");
const router = express.Router();

const {
  handleCurrentUserDetails,
  handleLoginUser,
  handleSignupUser,
} = require("../controllers/user");
const validateAuthToekn = require("../middleware/authHandler");

router.post("/signup", handleSignupUser);

router.post("/login", handleLoginUser);

router.get("/current", validateAuthToekn, handleCurrentUserDetails);

module.exports = router;
