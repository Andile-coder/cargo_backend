const Order = require("../models/Order");
const asyncHandler = require("express-async-handler");

//@desc create order
//@route POST /api/order
//@access private
const createOrder = asyncHandler(async (req, res) => {
  const {
    parcel_name,
    required_temp,
    droppoff_address,
    pickup_address,
    pickup_date,
    sender_number,
    sender_email,
    sender_full_name,
    receiver_number,
    receiver_email,
    receiver_full_name,
  } = req.body;

  const user = req.user;
  const order_number = req.order_number;

  if (
    !parcel_name ||
    !required_temp ||
    !droppoff_address ||
    !pickup_address ||
    !sender_number ||
    !sender_email ||
    !sender_full_name ||
    !receiver_number ||
    !receiver_email ||
    !receiver_full_name ||
    !user == null
  ) {
    res.status(400).json({ message: "Missing Values" });
    return;
  }

  Order.create({
    parcel_name,
    required_temp,
    droppoff_address,
    pickup_address,
    pickup_date,
    user_id: user.user_id,
    order_number,
    sender_number,
    sender_email,
    sender_full_name,
    receiver_number,
    receiver_email,
    receiver_full_name,
  })
    .then((order) => {
      res.status(201).json({ message: "Order created succesfully " });
      return;
    })
    .catch((error) => {
      res.status(400).send({ message: "Failed to create Order " + error });
      return;
    });
  return;
});

//@desc update order
//@route UPDATE /api/order/cancel/:id
//@access private
const cancelOrder = asyncHandler(async (req, res) => {
  const { user_id } = req.user;
  const { id } = req.params;
  //find order
  await Order.update(
    { status: "CANCELED" },
    { where: { order_id: id, user_id } }
  )
    .then((result) => {
      res.status(201).json({ message: "Order Canceled Succesfully" });
      return;
    })
    .catch((error) => {
      res.status(400).json({ message: "Failed to cancel Order", error });
      return;
    });
});

//@desc update order
//@route UPDATE /api/order/cancel/:id
//@access private
const inProgressOrder = asyncHandler(async (req, res) => {
  const { driver_id } = req.user;
  const { id } = req.params;
  //find order
  await Order.update(
    { status: "INPROGRESS" },
    { where: { order_number: id, driver_id } }
  )
    .then((result) => {
      res.status(201).json({ message: "Order now inprogress" });
      return;
    })
    .catch((error) => {
      res.status(400).json({ message: "Failed to opdate Order", error });
      return;
    });
});

//@desc  asign order to driver
//@route UPDATE /api/order/driver
//@access private
const assignDriver = asyncHandler(async (req, res) => {
  const { driver_id, order_number } = req.body;
  //find order
  await Order.update({ driver_id }, { where: { order_number } })
    .then((result) => {
      res.status(201).json({ message: "Driver Assigned Succesfully" });
      return;
    })
    .catch((error) => {
      res.status(400).json({ message: "Failed to Assign Driver", error });
      return;
    });
});

//@desc change driver order
//@route GET /api/order/:id
//@access private

const getOrderbyOrderNumber = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { user_id } = req.user;

  await Order.findOne({ where: { order_number: id } })
    .then((result) => {
      res.status(201).json({ data: result });
      return;
    })
    .catch((error) => {
      res.status(400).json({ mesaage: "Failed to get order", error });
      return;
    });
});
//@desc change driver order
//@route GET /api/order/
//@access private
const getUserOrders = asyncHandler(async (req, res) => {
  const { user_id } = req.user;
  await Order.findAll({ where: { user_id } })
    .then((result) => {
      res.status(201).json({ data: result });
      return;
    })
    .catch((error) => {
      res.status(400).json({ mesaage: "Failed to get orders", error });
      return;
    });
});

//@desc change driver order
//@route GET /api/order/
//@access private
const getDriverOrders = asyncHandler(async (req, res) => {
  const { driver_id } = req.user;
  const { status } = req.query;
  const condition = { driver_id };

  // Check if a status query parameter is provided
  if (status) {
    condition.status = status;
  }
  await Order.findAll({ where: condition })
    .then((result) => {
      res.status(201).json({ data: result });
      return;
    })
    .catch((error) => {
      res.status(400).json({ mesaage: "Failed to get orders", error });
      return;
    });
});
//@desc change driver order
//@route GET /api/order/
//@access private

const getAllOrders = asyncHandler(async (req, res) => {
  console.log(req);
  const { admin_id } = req.user;
  const { status } = req.query;
  const condition = {};

  // Check if a status query parameter is provided
  if (admin_id) {
    if (status) {
      condition.status = status;
    }
    await Order.findAll({ where: condition })
      .then((result) => {
        res.status(201).json({ data: result });
        return;
      })
      .catch((error) => {
        res.status(400).json({ mesaage: "Failed to get orders", error });
        return;
      });
  } else {
    res.status(401).json({ mesaage: "User not Authorised" });
    return;
  }
});
//@desc change driver order
//@route UPDATE /api/order/deliver/
//@access private
const changeOrderDriver = asyncHandler(async (req, res) => {});

//@desc deliver order
//@route UPDATE /api/order/deliver/:id
//@access private
const deliverOrder = asyncHandler(async (req, res) => {});

//@desc update pickupAddress order
//@route UPDATE /api/order/:id
//@access private
const updatePickupAdress = asyncHandler(async (req, res) => {});

//@desc create order
//@route UPDATE /api/order/:id
//@access private
const updateDroppOffAddress = asyncHandler(async (req, res) => {});

module.exports = {
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
};
