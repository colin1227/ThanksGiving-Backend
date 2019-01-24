const mongoose = require('mongoose');

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost/thanksgiving';

mongoose.connect(connectionString, {useNewUrlParser: true});

mongoose.connection.on('connected', ()=>{
    console.log(`mongoose is connected to database using connection string: ${connectionString}`);
})

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected ');
});

mongoose.connection.on('error', (err) => {
    console.log('Mongoose error ', err);
});