const express = require("express");
const flightRouter = express.Router();

const Flight = require("../models/flight_model");

flightRouter.get("/flights", async (req, res) => {
  const allFlights = await Flight.find({});
  return res.json(allFlights);
});

module.exports = flightRouter;