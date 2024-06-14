var express = require("express");
var usersRouter = require("./users");
var farmRouter = require("./farm");
var marketRouter = require("./market");
var quizRouter = require("./quiz");

var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
    res.send("Hello World!");
});

router.use("/users", usersRouter);
router.use("/farm", farmRouter);
router.use("/market", marketRouter);
router.use("/quiz", quizRouter);

module.exports = router;
