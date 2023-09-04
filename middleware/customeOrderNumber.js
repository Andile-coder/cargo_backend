const { v4: uuidv4 } = require("uuid");
const Order = require("../models/Order");
const asyncHandler = require("express-async-handler");
const generateUniqueOrderUuid = asyncHandler(async (req, res, next) => {
  //if order number exists

  const order_number = uuidv4().split("-")[0];
  const order = await Order.findOne({ where: { order_number } });

  if (order == null) {
    req.order_number = order_number;
    next();
  } else {
    generateUniqueOrderUuid();
  }
});

module.exports = { generateUniqueOrderUuid };
