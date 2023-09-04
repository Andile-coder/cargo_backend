const express = require("express");
const sequelize = require("./config");
const User = require("./models/User");
const Admin = require("./models/Admin");
const Driver = require("./models/Driver");
const Vehicle = require("./models/Vehicle");
const InvalidToken = require("./models/InvalidToken");
const { DataTypes } = require("sequelize");
const dotenv = require("dotenv").config();
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());
const port = process.env.Port || 3001;
//client /User
const userAuthRoutes = require("./routes/UserAuthRoutes");
app.use("/", userAuthRoutes);
//driver
const driverAuthRoutes = require("./routes/DriverAuthRoutes");
app.use("/driver", driverAuthRoutes);
//order
const orderRoutes = require("./routes/OrderRoutes");
app.use("/order/", orderRoutes);

//start server
app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
