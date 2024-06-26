var express = require("express");
var usersRouter = require("./users");
var farmRouter = require("./farm");
var marketRouter = require("./market");
var quizRouter = require("./quiz");
var rankingRouter = require("./ranking");
var historyRouter = require("./history");
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
router.use("/quiz", loginRequired, quizRouter);
router.use("/ranking", loginRequired, rankingRouter);
router.use("/history", loginRequired, historyRouter);

module.exports = router;
