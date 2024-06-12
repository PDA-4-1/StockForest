var express = require("express");
var pool = require("../../config/db.connect.js");
var router = express.Router();

router.post("/signup", async (req, res) => {
    //TODO : 회원가입 로직 구현
});

router.post("/signin", async (req, res) => {
    //TODO : 로그인 로직 구현
});

router.get("/exist/:nick", async (req, res) => {
    //TODO : 닉네임 중복 확인 로직 구현
});

router.get("/:id", async (req, res) => {
    //TODO : 사용자 정보 불러오기(nickname, 수익률, pdi, 턴, 프로필사진)
});

module.exports = router;
