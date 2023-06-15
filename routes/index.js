var express = require('express');
var router = express.Router();
var required = require('express-required-fields')
const db = require('../db.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/expenses/add', required(['name', 'price', 'date']), function(req, res, next) {
    const expense = {
      name: req.body.name,
      price: req.body.price,
      date: new Date(req.body.date),
    };
    db.add(expense);
    res.status(200).json(expense);
});

router.get('/expenses', function(req, res, next) {
  res.json(db.get());
});

router.post('/expenses/filter', required(['date']), function(req, res, next) {
    const date = new Date(req.body.date).toDateString();
    const expenses = db.get().filter(expense => expense.date.toDateString() === date);
    res.status(200).json(expenses);
});

router.post('/expenses/limit/set', function(req, res, next) {
  const limit = req.body.limit;
  if (typeof limit !== 'number' || limit < 0) {
      return res.status(400).json({ error: 'Incorrect value' });
  }
  db.setLimit(limit);
  res.status(200).json({ limit });
});

router.get('/expenses/limit', function(req, res, next) {
  res.json({ limit: db.getLimit() });
});

module.exports = router;
