const asyncHandler = require("express-async-handler");
const OrderHistory = require("../models/OrderHistory");

//@desc create order history
//@route POST /order_history/:order_number
//@access private admin

const createOrderHistory = asyncHandler(async (req, res) => {
  const { notes, status } = req.body;
  const { order_number } = req.params;
  const user = req.user;

  if (!notes || !status || !order_number || !user == null) {
    res.status(400).json({ message: "Missing Values" });
    return;
  }

  OrderHistory.create({
    notes,
    order_number,
    status,
  })
    .then((OrderObj) => {
      res.status(201).json({ message: "Order History created succesfully " });
      return;
    })
    .catch((error) => {
      res
        .status(400)
        .send({ message: "Failed to create Order History " + error });
      return;
    });
  return;
});

module.exports = { createOrderHistory };
