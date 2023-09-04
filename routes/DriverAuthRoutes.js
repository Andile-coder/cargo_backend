const express = require("express");

const {
  createDriver,
  loginDriver,
  logoutDriver,
} = require("../controllers/DriverAuthController");
const router = express.Router();

router.post("/register", createDriver);
router.post("/login", loginDriver);
router.post("/logout", logoutDriver);

module.exports = router;
