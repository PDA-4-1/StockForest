var express = require("express");
var pool = require("../../config/db.connect.js");
var router = express.Router();
const moment = require("moment");

router.get("/:turn", async (req, res) => {
    //TODO : 시장 화면 첫 진입 시 종목 목록 띄우기 위한 데이터 요청
    // 종목명, 설명, 산업 + 등락률
    const date = moment("2020-01-01");
    const query = `select a.id, a.name, b.price, b.diff from stock a inner join stock_price b on a.id=b.stock_id where b.date=?;`;
    const [result] = await pool.query(query, [
        date.add(req.params.turn * 7 - 1, "days").format("YYYY-MM-DD"),
    ]);
    // console.log(result);
    res.send(result);
});

router.get("/rank/:id", async (req, res) => {
    //TODO : 랭킹 불러오기. TOP 5 + 본인 몇 등인지
    // top5 랭킹 불러오기
    const query = `select a.user_id, a.user_pdi, b.nickname, b.img, rank() over(order by a.user_pdi desc) as ranking from ranking a inner join user b on a.user_id=b.id limit 5;`;
    const [result] = await pool.query(query);
    // console.log(result);

    // 본인 랭킹
    const user_query = `select a.user_id, a.user_pdi, b.nickname, b.img, rank() over(order by a.user_pdi desc) as ranking from ranking a inner join user b on a.user_id=b.id where b.id=?;`;
    const [user_result] = await pool.query(user_query, [req.params.id]);
    // console.log(user_result);

    const obj = {
        top5: result,
        amI: user_result,
    };
    res.send(obj);
});

router.get("/:stockId/:turn", async (req, res) => {
    //TODO : 종목 주가 데이터 요청. 차트에 표시할 과거 1주일간의 데이터 요청
    const date = moment("2020-01-01");
    const query = `select a.id, a.name, a.description, b.price, b.date, b.diff from stock a inner join stock_price b on a.id=b.stock_id where a.id=? and (b.date>=? and b.date<=?);`;
    const [result] = await pool.query(query, [
        req.params.stockId,
        date.add((req.params.turn - 1) * 7 + 1, "days").format("YYYY-MM-DD"),
        date.add(6, "days").format("YYYY-MM-DD"),
    ]);
    // console.log(result);
    res.send(result);
});

router.get("/sell/:id/:stockId/:turn", async (req, res) => {
    //TODO : 현재 가지고 있는 주식 수, 가격 불러오기
    const date = moment("2020-01-01");
    const query = `select a.user_id, a.stock_id, a.quantity, b.price from hold_stock a inner join stock_price b on a.stock_id=b.stock_id where a.user_id=? and a.stock_id=? and b.date=?;`;
    const [result] = await pool.query(query, [
        req.params.id,
        req.params.stockId,
        date.add(req.params.turn * 7 - 1, "days").format("YYYY-MM-DD"),
    ]);
    // console.log(result);
    res.send(result);
});

router.post("/buy", async (req, res) => {
    //TODO : 주식 매수. request body 값들 활용해서 DB 값 수정하기.
});

router.post("/sell", async (req, res) => {
    //TODO : 몇 개 팔건지 요청받아서 뺄거 빼고 필요한 계산 수행
});

router.post("/turn/:id", async (req, res) => {
    //TODO : 턴 넘기기. 다음 주 날짜로 바꾸기, 뉴스 정보 있으면 받아오기
});

module.exports = router;
