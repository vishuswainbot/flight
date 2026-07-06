const express = require("express");
const signupRouter = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/user_model");

signupRouter.post("/signup", async (req, res) => {
  const body = req.body;

  if (
    !body ||
    !body.userFirstName ||
    !body.userLastName ||
    !body.userContact ||
    !body.userEmail ||
    !body.userPassword
  ) {
    return res.status(400).json({ msg: "Fields are required" });
  }

  const salt= await bcrypt.genSalt(10);
  const secPass = await bcrypt.hash(body.userPassword, salt)

  const userResult = await User.create({
    userFirstName: body.userFirstName,
    userLastName: body.userLastName,
    userPassword: secPass,
    userContact: body.userContact,
    userEmail: body.userEmail,
  });
  console.log("result", userResult);
  return res.status(200).json({ msg: "User created" });
});

module.exports = signupRouter;
