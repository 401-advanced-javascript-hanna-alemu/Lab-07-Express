'use strict';


const express = require('express');

const app = express();

//Hanna - import db and routes from routes folder

const categoryRoutes = require('./../routes/category-routes');


const timeStamp = (req, res, next) => {
  req.requestTime = Date.now();
  next();
};

const logger = (req, res, next) => {
  console.log(`LOG: ${req.method} :: ${req.path} :: ${req.requestTime}`);
  next();
};

const generateRando = (req, res, next) => {
  let number = Math.round(Math.random());

  if (number === 1) {
    req.valid = true;
  } else {
    req.valid = false;
  }
  console.log(number);
  next();
};


app.use(generateRando);

app.use(express.json());

app.use(timeStamp);

app.use(logger);

app.use(categoryRoutes);

// Hanna - these are 404 and 500 error handling middleware

const error404 = (req, res) => {
  console.log('Unknown Route');
  res.status(404);
  res.send('I am not sure what you want');
  res.end();
};

const error500 = (err, req, res, next) => {
  console.log('In error handler');
  res.status(500);
  res.send('I am not sure what to do');
};


let PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Listening on ${PORT}`));

module.exports = {
  server: app,
  start: port => {
    let PORT = port || process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Listnening on ${PORT}`));
  },
};


