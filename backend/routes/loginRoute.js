const express = require("express");
const loginRouter = express.Router();

const User = require("../models/user_model");

loginRouter.post("/login", async (req, res) => {
  try {
    const { userEmail, userPassword } = req.body;

    const user = await User.findOne({ userEmail });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.userPassword !== userPassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        firstName: user.userFirstName,
        lastName: user.userLastName,
        email: user.userEmail,
        contact: user.userContact
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = loginRouter;