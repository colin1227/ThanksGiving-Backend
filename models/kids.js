const mongoose = require("mongoose");
const kidSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,

    canDrink: Boolean,
    age: Number,
    BirthDay: Number,
    BirthMonth: Number
});

module.exports = mongoose.model("People", kidSchema);