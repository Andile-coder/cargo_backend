//get vehicle by id
//get vehicle by driver name
//create vehicle
//assign vehicle to driver
const express = require("express");

const validateToken = require("../middleware/validateToken");
const {
  creatVehicle,
  getAllVehicles,
  getVehicleById,
  assignDriver,
} = require("../controllers/VehicleController");
const router = express.Router();

router.post("/", validateToken, creatVehicle);
router.get("/", validateToken, getAllVehicles);
router.get("/:id", validateToken, getVehicleById);
router.patch("/driver", validateToken, assignDriver);
module.exports = router;
