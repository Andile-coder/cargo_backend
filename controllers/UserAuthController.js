const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

//@desc register user
//@route POST /register
//@access public

const createUser = asyncHandler(async (req, res) => {
  const { username, email, password, cell_phone_number } = req.body;

  if (!username || !email || !password || !cell_phone_number) {
    res.status(400).send({ message: "Missing Values" });
  }
  const availableUser = await User.findOne({ where: { email } });
  if (availableUser) {
    res.status(400).send({ message: "Email already Exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  User.create({
    username,
    email,
    password: hashedPassword,
    active: false,
    varified: false,
    cell_phone_number,
  })
    .then((user) => {
      res.status(201).json({ message: "user created succesfully " });
    })
    .catch((error) => {
      res.status(400).send({ message: "Failed to create user " + error });
    });
});

//@desc login user
//@route POST /login
//@access public

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).send({ message: "Missing Values" });
  }

  const user = await User.findOne({ where: { email } });
  console.log(process.env.ACCESS_TOKEN_SECRET);
  //compare password

  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          user_id: user.user_id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "59m" }
    );
    res.status(200).json({ message: user, accessToken });
  } else if (user == null) {
    res.status(404).send({ message: "Email not registered" });
  } else {
    res.status(401).send({ message: "Invalid Password or Email" });
  }
});

module.exports = { createUser, loginUser };
