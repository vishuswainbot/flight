const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    userFirstName: {
        type: String,
    },
    userLastName: {
        type: String,
    },
    userPassword: {
        type: String,
    },
    userContact: {
    type: Number,
    },
    userEmail: {
        type: String,
    },

});

module.exports = mongoose.model("users", userSchema)