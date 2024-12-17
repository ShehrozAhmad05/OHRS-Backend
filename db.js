const mongoose = require("mongoose");


var mongoURL = 'mongodb+srv://sherrydb:sherry1122@cluster0.gg0vb.mongodb.net/mern-rooms'

mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true });

var connection = mongoose.connection;

connection.on('error', console.error.bind(console, 'connection error:'));

connection.on('connected',() => {
    console.log('Connected to MongoDB');
});

module.exports = mongoose;