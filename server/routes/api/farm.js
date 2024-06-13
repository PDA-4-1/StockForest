var express = require("express");
var pool = require("../../config/db.connect.js");
var router = express.Router();

router.get("/:id", async (req, res) => {
    //TODO : 사용자 농장 식물 받아오기(농장 3*3 배열에 띄울 종목)
});

router.get("/stock/:id", async (req, res) => {
    //TODO : 농장에서 클릭하면 요청할 api. 종목명, 보유 주식 수, 평단가, 수익 반환하면 될듯?
});

module.exports = router;
