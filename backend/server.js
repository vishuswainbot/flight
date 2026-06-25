require("dotenv").config();

const cors = require("cors");
const express = require("express");
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/user", require("./routes/loginRoute"));
app.use("/api/user", require("./routes/signupRoute"));

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

app.get("/flights", async (req, res) => {
  const allFlights = await Flight.find({});
  return res.json(allFlights);
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

// app.post("/api/user", async(req, res)=>{
//   const body = req.body;

//   if(
//     !body ||
//     !body.userFirstName ||
//     !body.userLastName ||
//     !body.userContact ||
//     !body.userEmail ||
//     !body.userPassword
//   ) {
//     return res.status(400).json({msg: "Fields are required"});
//   }

//   const userResult = await User.create({
//     userFirstName: body.userFirstName,
//     userLastName: body.userLastName,
//     userPassword: body.userPassword,
//     userContact: body.userContact,
//     userEmail: body.userEmail,
//   });
//   console.log("result", userResult);
//   return res.status(200).json({msg: "User created"})
// })

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
