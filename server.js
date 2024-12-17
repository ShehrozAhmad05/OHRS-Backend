
const express = require("express");
const cors = require('cors');

const app = express();

const dbconfig = require('./db');
const roomsRoute = require('./routes/roomsRoute');
const usersRoute = require('./routes/usersRoute');
const bookingsRoute = require('./routes/bookingsRoute');

app.use(cors());
app.use(express.json());
app.use('/api/rooms', roomsRoute);
app.use('/api/users', usersRoute);
app.use('/api/bookings', bookingsRoute); 

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port} using nodemon`);
});


