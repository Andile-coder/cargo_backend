const express = require("express");

const {
  createAdmin,
  loginAdmin,
  acceptOrder,
} = require("../controllers/AdminController");
const validateToken = require("../middleware/validateToken");
const router = express.Router();

router.post("/register", createAdmin);
router.post("/login", loginAdmin);
router.patch("/accept_order/:id", validateToken, acceptOrder);
router.patch("/assign_driver/:id", validateToken, acceptOrder);

module.exports = router;
