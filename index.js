const express = require('express');
const bodyParser = require('body-parser');
const todoRoutes = require('./routes.js');
const mongoose = require('mongoose')


const app = express();
const port = 4000;

mongoose.connect('mongodb+srv://admin:111@cluster0.2xws8ws.mongodb.net/todos?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(bodyParser.json());

app.use('/api', todoRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
