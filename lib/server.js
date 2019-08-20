'use strict';


const express = require('express');

const app = express();



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

let db = [];

app.use(express.json());

app.use(timeStamp);

app.use(logger);

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



// Route to Get All Categories
app.get('/categories', (req, res, next) => {

  let count = db.length;
  let results = db;
  res.json({ count, results });
  console.log(req.requestTime);

});

// Route to Create a Category

app.post('/categories', (req, res, next) => {
  let record = req.body;
  record.id = Math.random();
  res.json(record);
  if(req.valid === true) {
    db.push(record);
  }else {
    error500();
  }
  next();
});


let PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Listening on ${PORT}`));

module.exports = {
  server: app,
  start: port => {
    let PORT = port || process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Listnening on ${PORT}`));
  },
};


