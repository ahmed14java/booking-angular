const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser')
const config = require('./config/dev');
const Rental = require('./models/Rental');

const rentalRoutes = require('./routes/rentals');
const userRoutes = require('./routes/users');

mongoose.connect(config.MONGO_DB_URL,
  {
    useNewUrlParser: true,
    useCreateIndex: true
  }
);
mongoose.connection.on('connected' , () => {
  console.log('Connected to the database');
})
mongoose.connection.on('error' , (err) => {
  console.log(`Failed to connect to the database: ${err}`);
  
});

const app = express();
app.use(bodyParser.json());
app.use('/api/v1/rentals' , rentalRoutes);
app.use('/api/v1/users' , userRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("server is running on port", PORT);
});
