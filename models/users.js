const mongoose = require('mongoose');
const Food = require('./food');
const Thanks = require('./thanks');
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    likedFood:[Food.schema],
    thanks: [Thanks.schema],
    super: Boolean
});

module.exports = mongoose.model('Users', userSchema);