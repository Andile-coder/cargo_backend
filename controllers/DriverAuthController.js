const Driver = require("../models/Driver");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const InvalidToken = require("../models/InvalidToken");
const sequelize = require("../config");

//@desc register Driver
//@route POST /driver/register
//@access public

const createDriver = asyncHandler(async (req, res) => {
  const { username, email, password, cell_phone_number, licence_number } =
    req.body;

  if (
    !username ||
    !email ||
    !password ||
    !cell_phone_number ||
    !licence_number
  ) {
    res.status(400).json({ message: "Missing Values" });
    return;
  }

  const availableDriver = await Driver.findOne({ where: { email } });
  if (availableDriver) {
    res.status(400).json({ message: "Email already Exists" });
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  Driver.create({
    username,
    email,
    password: hashedPassword,
    active: false,
    varified: false,
    cell_phone_number,
    licence_number,
  })
    .then((Driver) => {
      res.status(201).json({ message: "Driver created succesfully " });
      return;
    })
    .catch((error) => {
      res.status(400).send({ message: "Failed to create Driver " + error });
      return;
    });
});
//@desc login Driver
//@route POST /driver/login
//@access public

const loginDriver = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).send({ message: "Missing Values" });
  }

  const driver = await Driver.findOne({ where: { email } });

  //compare password

  if (driver && (await bcrypt.compare(password, driver.password))) {
    const accessToken = jwt.sign(
      {
        Driver: {
          username: driver.username,
          email: driver.email,
          driver_id: driver.driver_id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "59m" }
    );
    res.status(200).json({ message: driver, accessToken });
  } else if (Driver == null) {
    res.status(404).send({ message: "Email not registered" });
  } else {
    res.status(401).send({ message: "Invalid Password or Email" });
  }
});
//@desc logout Driver
//@route POST /driver/logout
//@access private
const logoutDriver = asyncHandler(async (req, res) => {
  async () => await sequelize.sync({ force: true });
  const { user_id } = req.body;
  const token = req.headers.Authorization || req.headers.authorization;
  async () => await sequelize.sync({ force: true });
  if (token && token.startsWith("Bearer ")) {
    const tokenToInvalidate = token.split(" ")[1];
    await InvalidToken.create({
      user_id,
      token: tokenToInvalidate,
    })
      .then(() => {
        return;
      })
      .catch((err) => {
        return res.status(400).send({ message: "Invalid request", err });
      });
    res.status(200).send({ message: "User logged out" });
  } else {
    res.status(400).send({ message: "Invalid request" });
  }
});
module.exports = { createDriver, loginDriver, logoutDriver };
