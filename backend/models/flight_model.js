const mongoose = require("mongoose");

const flightSchema = new mongoose.Schema(
  {
    flight_number: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
    },
    airline_name: {
      type: String,
      required: true,
      trim: true,
    },
    departure_airport: {
      type: String,
      required: true,
      trim: true,
    },
    departure_time: {
      type: Date,
      required: true,
    },
    arrival_airport: {
      type: String,
      required: true,
      trim: true,
    },
    arrival_time: {
      type: Date,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Flight", flightSchema);