const {setUser} = require("../service/sessionAuth")
const express = require("express");
const loginRouter = express.Router();
const bcrypt = require("bcrypt");

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
    const passwordMatch = await bcrypt.compare(userPassword, user.userPassword);

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }
    const token = setUser(user);
    res.cookie("uid", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax"
    });

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