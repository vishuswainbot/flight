const mongoose = require("mongoose");

const flight_schema = new mongoose.Schema({
    flight_number: {
        type: String,
    },
    airline_name:{
        type: String,
    },
    departure_airport: {
        type: String,
    },
    departure_time:{
        type: Date,
    },
    arrival_airport:{
        type: String,
    },
    arrival_time:{
        type: Date,
    },
    duration:{
        type: String,
    }
});

module.exports = mongoose.model("flights", flight_schema)