const mongoose = require('mongoose');

const thankfulSchema = new mongoose.Schema ({
    title:String,
    body: String
});

module.exports = mongoose.model('Thanks', thankfulSchema);