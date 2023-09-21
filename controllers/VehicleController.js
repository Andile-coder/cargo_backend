//get Vehicle by id
//get conatiner by mac address
//create Vehicle
//assign Vehicle to vehicle
const Vehicle = require("../models/Vehicle");
const asyncHandler = require("express-async-handler");

const creatVehicle = asyncHandler(async (req, res) => {
  const { model, registration_number } = req.body;

  const user = req.user;

  if (!model || !registration_number || !user == null) {
    res.status(400).json({ message: "Missing Values" });
    return;
  }

  Vehicle.create({
    model,
    registration_number,
  })
    .then((Vehicle) => {
      res.status(201).json({ message: "Vehicle created succesfully " });
      return;
    })
    .catch((error) => {
      res.status(400).send({ message: "Failed to create Vehicle " + error });
      return;
    });
  return;
});

const getVehicleById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  await Vehicle.findOne({ where: { mac_address: id } })
    .then((result) => {
      res.status(201).json({ data: result });
      return;
    })
    .catch((error) => {
      res.status(400).json({ mesaage: "Failed to get Vehicle", error });
      return;
    });
});

const assignDriver = asyncHandler(async (req, res) => {
  const { vehicle_id, driver_id } = req.body;
  //find Vehicle
  await Vehicle.update({ driver_id }, { where: { vehicle_id } })
    .then((result) => {
      res.status(201).json({ message: "Driver Assigned Succesfully" });
      return;
    })
    .catch((error) => {
      res.status(400).json({ message: "Failed to Assign Driver", error });
      return;
    });
});

const getAllVehicles = asyncHandler(async (req, res) => {
  await Vehicle.findAll()
    .then((result) => {
      res.status(201).json({ data: result });
      return;
    })
    .catch((error) => {
      res.status(400).json({ mesaage: "Failed to get Vehicles", error });
      return;
    });
});
module.exports = {
  creatVehicle,
  getVehicleById,
  assignDriver,
  getAllVehicles,
};
