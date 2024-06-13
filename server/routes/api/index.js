var express = require('express');
var usersRouter = require('./users');
var gardenRouter = require('./garden');
var marketRouter = require('./market');
var quizRouter = require('./quiz');

var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("Hello World!");
});

router.use('/users', usersRouter);
router.use('/garden',gardenRouter);
router.use('/market', marketRouter);
router.use('/quiz', quizRouter);

module.exports = router;
