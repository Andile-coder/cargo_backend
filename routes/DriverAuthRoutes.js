const express = require("express");

const {
  createDriver,
  loginDriver,
  logoutDriver,
} = require("../controllers/DriverAuthController");
const router = express.Router();

router.post("/driver/register", createDriver);
router.post("/driver/login", loginDriver);
router.post("/driver/logout", logoutDriver);

module.exports = router;
