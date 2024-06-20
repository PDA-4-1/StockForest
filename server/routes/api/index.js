var express = require("express");
var usersRouter = require("./users");
var farmRouter = require("./farm");
var marketRouter = require("./market");
var quizRouter = require("./quiz");
var rankingRouter = require("./ranking");
var { loginRequired, userMiddleware } = require("../../middleware/verifyUser");

var router = express.Router();

router.use(userMiddleware);
/* GET home page. */
router.get("/", function (req, res, next) {
    res.send("Hello World!");
});

router.use("/users", usersRouter);

router.use("/farm", loginRequired, farmRouter);
router.use("/market", loginRequired, marketRouter);
router.use("/quiz", quizRouter);
router.use("/ranking", loginRequired, rankingRouter);

module.exports = router;
