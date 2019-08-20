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

let db = [];

app.use(express.json());

app.use(timeStamp);

app.use(logger);


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
  db.push(record);
  res.json(record);
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

