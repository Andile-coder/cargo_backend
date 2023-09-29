const Admin = require("../models/Admin");
const Order = require("../models/Order");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

//@desc register Admin
//@route POST /register
//@access public

const createAdmin = asyncHandler(async (req, res) => {
  const { username, email, password, cell_phone_number } = req.body;

  if (!username || !email || !password || !cell_phone_number) {
    res.status(400).send({ message: "Missing Values" });
    return;
  }
  const availableAdmin = await Admin.findOne({ where: { email } });
  if (availableAdmin) {
    res.status(409).send({ message: "Email already Exists" });
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  Admin.create({
    username,
    email,
    password: hashedPassword,
    active: false,
    varified: false,
    cell_phone_number,
  })
    .then((Admin) => {
      res.status(201).json({ message: "Admin created succesfully " });
    })
    .catch((error) => {
      res.status(400).send({ message: "Failed to create Admin " + error });
    });
});
//@desc login Admin
//@route POST /login
//@access public

const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).send({ message: "Missing Values" });
  }

  const admin = await Admin.findOne({ where: { email } });

  //compare password

  if (admin && (await bcrypt.compare(password, admin.password))) {
    const accessToken = jwt.sign(
      {
        admin: {
          username: admin.username,
          email: admin.email,
          admin_id: admin.user_id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET
    );
    res.status(200).json({ message: admin, accessToken });
  } else if (admin == null) {
    res.status(404).send({ message: "Email not registered" });
  } else {
    res.status(401).send({ message: "Invalid Password or Email" });
  }
});
//@desc logout Admin
//@route POST /logout
//@access private
const logoutAdmin = asyncHandler(async (req, res) => {
  async () => await sequelize.sync({ force: true });
  const { Admin_id } = req.body;
  const token = req.headers.Authorization || req.headers.authorization;
  async () => await sequelize.sync({ force: true });
  if (token && token.startsWith("Bearer ")) {
    const tokenToInvalidate = token.split(" ")[1];
    await InvalidToken.create({
      Admin_id,
      token: tokenToInvalidate,
    })
      .then(() => {
        return;
      })
      .catch((err) => {
        return res.status(400).send({ message: "Invalid request", err });
      });
    res.status(200).send({ message: "Admin logged out" });
  } else {
    res.status(400).send({ message: "Invalid request" });
  }
});
//@desc accept order
//@route UPDATE /accept_order/:id
//@access private

const acceptOrder = asyncHandler(async (req, res) => {
  const { admin_id } = req.user;
  const { id } = req.params;
  //find order
  if (admin_id) {
    await Order.update({ status: "ACCEPTED" }, { where: { order_number: id } })
      .then((result) => {
        res.status(201).json({ message: "Order now Accepted" });
        return;
      })
      .catch((error) => {
        res.status(400).json({ message: "Failed to opdate Order", error });
        return;
      });
  } else {
    res.status(401).json({ mesaage: "User not Authorised" });
    return;
  }
});
//@desc assign order
//@route UPDATE /assign_driver/:id
//@access private
const assignDriver = asyncHandler(async (req, res) => {
  const { driver_id, order_number } = req.body;
  const { admin_id } = req.user;
  //find order
  if (admin_id) {
    await Order.update({ driver_id }, { where: { order_number } })
      .then((result) => {
        res.status(201).json({ message: "Driver Assigned Succesfully" });
        return;
      })
      .catch((error) => {
        res.status(400).json({ message: "Failed to Assign Driver", error });
        return;
      });
  } else {
    res.status(401).json({ mesaage: "User not Authorised" });
    return;
  }
});
module.exports = {
  createAdmin,
  loginAdmin,
  logoutAdmin,
  acceptOrder,
  assignDriver,
};
