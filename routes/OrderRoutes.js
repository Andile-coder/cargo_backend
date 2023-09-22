const express = require("express");
const {
  createOrder,
  cancelOrder,
  assignDriver,
  deliverOrder,
  changeOrderDriver,
  getOrderbyOrderNumber,
  getUserOrders,
  getDriverOrders,
  inProgressOrder,
  getAllOrders,
} = require("../controllers/OrderController");
const validateToken = require("../middleware/validateToken");
const { generateUniqueOrderUuid } = require("../middleware/customeOrderNumber");

const router = express.Router();

router.post("/", validateToken, generateUniqueOrderUuid, createOrder);
//get
router.get("/user/:id", validateToken, getOrderbyOrderNumber);
router.get("/admin/orders/", validateToken, getAllOrders);
router.get("/", validateToken, getUserOrders);
router.patch("/cancel/:id", validateToken, cancelOrder);
router.patch("/inprogress/:id", validateToken, inProgressOrder);
router.put("/order/deliver/:id", deliverOrder);
router.get("/driver", validateToken, getDriverOrders);
router.patch("/driver", validateToken, assignDriver);
router.put("/driver", changeOrderDriver);
module.exports = router;
