const mongoose = require("mongoose");
const Food = require("./food");
const peopleSchema = new mongoose.Schema({
    name: String,
    foodBrought:[Food.schema]
});

module.exports = mongoose.model("People", peopleSchema);