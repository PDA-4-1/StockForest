var express = require("express");
var pool = require("../../config/db.connect.js");
var router = express.Router();

router.get("/:turn", async (req, res) => {
    //TODO : 시장 화면 첫 진입 시 종목 목록 띄우기 위한 데이터 요청
    // 종목명, 설명, 산업 + 등락률
});

router.get("/stock/:turn", async (req, res) => {
    //TODO : 종목 주가 데이터 요청. 차트에 표시할 과거 1주일간의 데이터 요청
});

router.get("/:id", async (req, res) => {
    //TODO : 랭킹 불러오기. TOP 10 + 본인 몇 등인지
});

router.post("/buy", async (req, res) => {
    //TODO : 주식 매수. request body 값들 활용해서 DB 값 수정하기.
    /*
    request body : {
	  stock_id,
	  price,
	  amount
    }
    */
});

router.get("/sell/:id/:stodkid/:turn", async (req, res) => {
    //TODO : 현재 가지고 있는 주식 수, 가격 불러오기
});

router.post('/sell', async (req, res) => {
    //TODO : 몇 개 팔건지 요청받아서 뺄거 빼고 필요한 계산 수행
});

router.post('/turn/:id', async (req, res) => {
    //TODO : 턴 넘기기. 다음 주 날짜로 바꾸기, 뉴스 정보 있으면 받아오기
})

module.exports = router;
