const express = require("express");
const validateToken = require("../middleware/validateToken");
const { createOrderHistory } = require("../controllers/OrderHistoryController");
const router = express.Router();

router.post("/:order_number", validateToken, createOrderHistory);

module.exports = router;
