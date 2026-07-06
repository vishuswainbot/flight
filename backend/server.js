require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const express = require("express");
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/user", require("./routes/loginRoute"));
app.use("/api/user", require("./routes/signupRoute"));
app.use("/api/user", require("./routes/flightRoute"));
app.use("/api/user", require("./routes/currentUserRoute"))

const Flight = require("./models/flight_model");
const User = require("./models/user_model");

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

app.get("/users", async (req, res) => {
  const allUsers = await User.find({});
  return res.json(allUsers);
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
