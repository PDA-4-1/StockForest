var express = require('express');
var usersRouter = require('./users');

var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("Hello World!");
});

router.use('/users', usersRouter);

module.exports = router;
