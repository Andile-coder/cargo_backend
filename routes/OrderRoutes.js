const express = require("express");
const {
  createOrder,
  cancelOrder,
  assignDriver,
  deliverOrder,
  changeOrderDriver,
} = require("../controllers/OrderController");
const validateToken = require("../middleware/validateToken");
const { generateUniqueOrderUuid } = require("../middleware/customeOrderNumber");

const router = express.Router();

router.post("/", validateToken, generateUniqueOrderUuid, createOrder);
router.patch("/cancel/:id", validateToken, cancelOrder);
router.put("/order/deliver/:id", deliverOrder);
router.patch("/driver", validateToken, assignDriver);
router.put("/driver", changeOrderDriver);
module.exports = router;
