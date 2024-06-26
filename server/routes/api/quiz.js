var express = require("express");
var pool = require("../../config/db.connect.js");
const axios = require("axios");
const dotenv = require("dotenv");
const moment = require("moment-timezone");
var router = express.Router();

dotenv.config();

router.post("/response", async (req, res) => {
    //TODO : 사용자가 퀴즈에 답한 내용을 기록. 어떤 종목인지, 오를지 내릴지
    try {
        const userId = req.userId;
        const stockId = req.body.stockId;
        const date = req.body.date;
        const upDown = req.body.upDown;

        const resQuery = `INSERT INTO quiz (user_id, stock_id, date, up_down) VALUES (?, ?, ?, ?)`;
        const [result] = await pool.query(resQuery, [
            userId,
            stockId,
            date,
            upDown,
        ]);
        console.log(result.affectedRows);
        res.send(result.affectedRows + "개의 레코드가 추가되었습니다");
    } catch (err) {
        console.log(err);
        res.send(err);
    }
});

router.patch("/answer", async (req, res) => {
    // 사용자가 응답한 기록 불러오기
    const yesterday = moment()
        .tz("Asia/Seoul")
        .subtract(1, "days")
        .format("YYYY-MM-DD"); // 하루 전 날
    const today = moment().tz("Asia/Seoul").format("YYYY-MM-DD");
    getResponseSQL = `SELECT stock_id, up_down, is_checked FROM quiz WHERE user_id = ? AND date = ?`;
    const [userResponse] = await pool.query(getResponseSQL, [
        req.userId,
        yesterday,
    ]);
    if (userResponse.length == 0) {
        res.send({
            code: 3,
            message: "어제의 퀴즈 기록이 없습니다",
        });
    }

    // //TODO : 퀴즈 답 확인, 맞았을 경우 보상받은 포인트까지 계산할 것
    try {
        const getAnswerQuery = `SELECT stock_name, answer, today_cost, yesterday_cost FROM quiz_answer WHERE date = ? AND stock_id = ?`;
        const [answerResponse] = await pool.query(getAnswerQuery, [
            today,
            userResponse[0].stock_id,
        ]);
        const answer = answerResponse[0].answer; // 실제 정답
        let isCorrect = userResponse[0].up_down == answer ? 1 : 0; // 정답 여부

        const answerQuery = `UPDATE quiz SET is_correct = ?, is_checked = 1 WHERE user_id = ? AND date = ?`;
        await pool.query(answerQuery, [isCorrect, req.userId, yesterday]);

        // 맞았을 경우 사용자의 pdi 추가
        if (isCorrect) {
            const addPointQuery = `UPDATE hold_stock SET avg_price = avg_price + 500 WHERE user_id = ? AND stock_id = 10`;
            await pool.query(addPointQuery, [req.userId]);
        }

        res.send({
            code: userResponse[0].is_checked ? 2 : 1,
            stockCode: userResponse[0].stock_id, // 고른 종목 코드
            stockName: answerResponse[0].stock_name, // 고른 종목 이름
            yesterdayCost: answerResponse[0].yesterday_cost,
            todayCost: answerResponse[0].today_cost,
            answerCheck: answer, //가격이 올랐나?
            isCorrect: isCorrect, // 사용자가 맞았나?
        });
    } catch (e) {
        console.log(e);
    }
});

router.get("/content", async (req, res) => {
    //TODO : 퀴즈에 띄울 투자전략 내용 반환하기
    try {
        const resQuery = `SELECT content FROM quiz_news WHERE date = ?`;
        const currentDate = moment().tz("Asia/Seoul").format("YYYY-MM-DD");
        const [result] = await pool.query(resQuery, [currentDate]);
        console.log(result[0].content);
        res.send({ content: result[0].content });
    } catch (err) {
        console.log(err);
        res.send(err);
    }
});

router.get("/:date", async (req, res) => {
    //TODO : 오늘이 공휴일인지 확인
    try {
        const holiQuery = `SELECT COUNT(*) AS count, date_name FROM holiday WHERE date = ?;`
        const [result] = await pool.query(holiQuery, [req.params.date]);
        const isHoly = result[0].count>0 ? 1 : 0;
        if(isHoly) res.send({
            isHoly : isHoly,
            date_name : result[0].date_name
        });
        else res.send({isHoly : isHoly});
    } catch (e) {
        console.log(e);
        res.send("ERROR : " + e);
    }
});

module.exports = router;
