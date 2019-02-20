const mongoose = require('mongoose');
const Food = require('./food');
const Thanks = require('./thanks');
const Kids = require('./kids');
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    
    firstName: String,
    lastName: String,

    canDrink: Boolean,
    
    foodBrought: [String],
    likedFood:[Food.schema],
    thanks: [Thanks.schema],
    familyCode: String,
    
    spouse: Boolean,
    spouseFirst: String,
    spouseLast: String,
    parents: [Object],
    siblings: [Object],
    kids:[Kids.schema],
    kidsIds: [String],

    
    super: Boolean
});

module.exports = mongoose.model('Users', userSchema);