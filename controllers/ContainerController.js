//get container by id
//get conatiner by mac address
//create container
//assign container to vehicle
const Container = require("../models/Container");
const asyncHandler = require("express-async-handler");

const creatContainer = asyncHandler(async (req, res) => {
  const { vehicle_id, model, mac_address, location } = req.body;

  const user = req.user;

  if (!model || !mac_address || !user == null) {
    res.status(400).json({ message: "Missing Values" });
    return;
  }

  Container.create({
    vehicle_id,
    model,
    mac_address,
    location,
  })
    .then((Container) => {
      res.status(201).json({ message: "Container created succesfully " });
      return;
    })
    .catch((error) => {
      res.status(400).send({ message: "Failed to create Container " + error });
      return;
    });
  return;
});

const getContainerbyMacAddress = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await Container.findOne({ where: { mac_address: id } })
    .then((result) => {
      res.status(201).json({ data: result });
      return;
    })
    .catch((error) => {
      res.status(400).json({ mesaage: "Failed to get Container", error });
      return;
    });
});

const assignVehicle = asyncHandler(async (req, res) => {
  const { vehicle_id, mac_address } = req.body;
  //find Container
  await Container.update({ vehicle_id }, { where: { mac_address } })
    .then((result) => {
      res.status(201).json({ message: "Driver Assigned Succesfully" });
      return;
    })
    .catch((error) => {
      res.status(400).json({ message: "Failed to Assign Driver", error });
      return;
    });
});

const getAllContainers = asyncHandler(async (req, res) => {
  await Container.findAll()
    .then((result) => {
      res.status(201).json({ data: result });
      return;
    })
    .catch((error) => {
      res.status(400).json({ mesaage: "Failed to get Containers", error });
      return;
    });
});

const updateIceTime = asyncHandler(async (req, res) => {
  const { icetime, mac_address } = req.body;
  //find Container
  await Container.update({ icetime }, { where: { mac_address } })
    .then((result) => {
      res.status(201).json({ message: "icetime updated Succesfully" });
      return;
    })
    .catch((error) => {
      res
        .status(400)
        .json({ message: "Failed to update ice time Driver", error });
      return;
    });
});
const updateTemp = asyncHandler(async (req, res) => {
  const { temp, mac_address } = req.body;
  //find Container
  await Container.update({ temp }, { where: { mac_address } })
    .then((result) => {
      res.status(201).json({ message: "Temperature updated Succesfully" });
      return;
    })
    .catch((error) => {
      res
        .status(400)
        .json({ message: "Failed to update temperature Driver", error });
      return;
    });
});
const updateLocation = asyncHandler(async (req, res) => {
  const { location, mac_address } = req.body;
  //find Container
  await Container.update({ location }, { where: { mac_address } })
    .then((result) => {
      res.status(201).json({ message: "Loation updated Succesfully" });
      return;
    })
    .catch((error) => {
      res
        .status(400)
        .json({ message: "Failed to update location Driver", error });
      return;
    });
});
module.exports = {
  creatContainer,
  getContainerbyMacAddress,
  assignVehicle,
  getAllContainers,
  updateIceTime,
  updateTemp,
  updateLocation,
};
