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
} = require("../controllers/ContainerController");
const router = express.Router();

router.post("/", validateToken, creatContainer);
router.get("/", validateToken, getAllContainers);
router.get("/:id", validateToken, getContainerbyMacAddress);
router.patch("/vehicle", validateToken, assignVehicle);
module.exports = router;
