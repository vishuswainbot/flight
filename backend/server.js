require("dotenv").config();

const express = require("express");
const app = express();
app.use(express.json());
const Flight = require("./flight_model");

const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);
const { connectMongoDB } = require("./connection");
connectMongoDB(process.env.MONGO_URL)
  .then(() => {
    console.log("Mongo Connected");
  })
  .catch((err) => {
    console.error("MongoDB Error:");
    console.error(err.message);
  });

app.get("/", async (req, res) => {
  const allFlights = await Flight.find({});
  return res.json(allFlights);
});

app.post("/api/flights", async (req, res) => {
  const body = req.body;

  if (
    !body ||
    !body.flight_number ||
    !body.airline_name ||
    !body.departure_airport ||
    !body.departure_time ||
    !body.arrival_airport ||
    !body.arrival_time ||
    !body.duration
  ) {
    return res.status(400).json({ msg: "field is required" });
  }
  const result = await Flight.create({
    flight_number: body.flight_number,
    airline_name: body.airline_name,
    departure_airport: body.departure_airport,
    departure_time: body.departure_time,
    arrival_airport: body.arrival_airport,
    arrival_time: body.arrival_time,
    duration: body.duration,
  });
  console.log("result", result);
  return res.status(201).json({ msg: "sucess" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
