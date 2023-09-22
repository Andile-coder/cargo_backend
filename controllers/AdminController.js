const Admin = require("../models/Admin");
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

  const Admin = await Admin.findOne({ where: { email } });

  //compare password

  if (Admin && (await bcrypt.compare(password, Admin.password))) {
    const accessToken = jwt.sign(
      {
        Admin: {
          username: Admin.username,
          email: Admin.email,
          Admin_id: Admin.user_id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET
    );
    res.status(200).json({ message: Admin, accessToken });
  } else if (Admin == null) {
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
module.exports = { createAdmin, loginAdmin, logoutAdmin };
