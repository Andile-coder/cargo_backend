const express = require("express");
const dotenv = require("dotenv").config();
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());
const port = process.env.PORT || 3001;
//client /User
const userAuthRoutes = require("./routes/UserAuthRoutes");
app.use("/", userAuthRoutes);
app.get("/", (req, res) => {
  res.send("Welcome to the home page");
});
//admin
const adminAuthRoutes = require("./routes/AdminRoutes");
app.use("/admin/", adminAuthRoutes);
//driver
const driverAuthRoutes = require("./routes/DriverAuthRoutes");
app.use("/driver", driverAuthRoutes);
//order
const orderRoutes = require("./routes/OrderRoutes");
app.use("/orders/", orderRoutes);
//order history
const orderHistoryRoutes = require("./routes/OrderHistoryRoutes");
app.use("/order_history", orderHistoryRoutes);

//Container
const containerRoutes = require("./routes/ContainerRoutes");
app.use("/containers/", containerRoutes);
//Vehicle
const vehicleRoutes = require("./routes/VehicleRoutes");
app.use("/vehicles/", vehicleRoutes);
//start server
app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
