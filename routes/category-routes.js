'use strict';

const express = require('express');

const router = express.Router();

let db = [];


// Route to Get All Categories
router.get('/categories', (req, res, next) => {

  let count = db.length;
  let results = db;
  res.json({ count, results });
  console.log(req.requestTime);

});

// Route to Create a Category
// @param{req}
/**
 * @param{req}
 * @param{res}
 * @param{next}
 */
router.post('/categories', (req, res, next) => {
  let record = req.body;
  record.id = Math.random();
  res.json(record);
  if (req.valid === true) {
    db.push(record);
  } else {
    error500();
  }
  next();
});

module.exports = router;
