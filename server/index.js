const express = require("express");
const mongoose = require("mongoose");
const config = require('./config/dev');

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

app.get("/rentals", (req, res) => {
  res.json({ success: true });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("server is running on port", PORT);
});
