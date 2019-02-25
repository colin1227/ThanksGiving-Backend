const mongoose = require('mongoose');
const Food = require('./food');
const Thanks = require('./thanks');
// const Kids = require('./kids');
const userSchema = new mongoose.Schema({
    
    firstName: String,
    lastName: String,

    familyCode: String, 
    
    canDrink: Boolean,
    foodBrought: [String],
    likedFood:[Food.schema],
    thanks: [Thanks.schema],

    family:[
        {firstName: String, 
        lastName: String, 
        relation: String}
    ],
    
    super: Boolean
});

module.exports = mongoose.model('Users', userSchema);