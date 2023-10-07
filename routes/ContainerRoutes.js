//get container by id
//get conatiner by mac address
//create container
//assign container to vehicle
const express = require("express");

const validateToken = require("../middleware/validateToken");
const {
  creatContainer,
  getAllContainers,
  getContainerbyMacAddress,
  assignVehicle,
  updateIceTime,
  updateTemp,
  updateLocation,
} = require("../controllers/ContainerController");
const router = express.Router();

router.post("/", validateToken, creatContainer);
router.get("/", validateToken, getAllContainers);
router.get("/:id", validateToken, getContainerbyMacAddress);
router.patch("/vehicle", validateToken, assignVehicle);
router.patch("/icetime", validateToken, updateIceTime);
router.patch("/temp", validateToken, updateTemp);
router.patch("/location", validateToken, updateLocation);
module.exports = router;
