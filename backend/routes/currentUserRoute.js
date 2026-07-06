const express = require("express");
const currentUserRouter = express.Router();
const User = require("../models/user_model")

currentUserRouter.get("/:id", async(req, res) =>{
  const id = req.params.id;
  const currentUser =await User.findById(id)
  res.json(currentUser);
});

module.exports = currentUserRouter;