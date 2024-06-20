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
        const userId = req.body.userId;
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
    // 한국투자증권 API 연결 - OAuth2 토큰 받기
    // 요청 내용 작성, 요청 보내기
    let headers;
    const URL = "https://openapi.koreainvestment.com:9443/oauth2/tokenP";
    headers = {
        "content-type": "application/json",
    };
    const body = {
        grant_type: "client_credentials",
        appkey: process.env.appKey,
        appsecret: process.env.appSecret,
    };
    const tokenReq = await axios.post(URL, body, { headers });

    // Token 확인
    const accessToken = tokenReq.data.access_token;

    //사용자가 응답한 기록 불러오기
    const currentDate = moment()
        .tz("Asia/Seoul")
        .subtract(1, "days")
        .format("YYYY-MM-DD"); //오늘 날짜
    console.log(currentDate);
    getResponseSQL = `SELECT stock_id, up_down FROM quiz WHERE user_id = ? AND date = ?`;
    const [userResponse] = await pool.query(getResponseSQL, [1, currentDate]);
    if (userResponse.length == 0)
        throw new Error("어제의 퀴즈 기록이 없습니다");
    console.log(userResponse[0]);
    
    // 한국투자증권 API 연결 - 일일 주가 요청하기
    const KIS_URL =
        "https://openapi.koreainvestment.com:9443/uapi/domestic-stock/v1/quotations/inquire-daily-itemchartprice";
    headers = {
        "content-type": "application/json",
        authorization: `Bearer ${accessToken}`,
        appkey: process.env.appKey,
        appsecret: process.env.appSecret,
        tr_id: process.env.tr_id,
    };
    const params = {
        FID_COND_MRKT_DIV_CODE: "J",
        FID_INPUT_ISCD: "005930",
        FID_INPUT_DATE_1: "20240619",
        FID_INPUT_DATE_2: "20240620",
        FID_PERIOD_DIV_CODE: "D",
        FID_ORG_ADJ_PRC: 0,
    };

    let todayCost, yesterdayCost;
    try {
        const stockReq = await axios.get(KIS_URL, { headers, params });
        todayCost = stockReq.data.output2[0].stck_clpr;
        yesterdayCost = stockReq.data.output2[1].stck_clpr;
        console.log(todayCost);
        console.log(yesterdayCost);
    } catch (e) {
        console.log(e);
    }
    

    // //TODO : 퀴즈 답 확인, 맞았을 경우 보상받은 포인트까지 계산할 것
    // const userId = req.body.userId;
    // const date = req.body.date;
    // const isCorrect = req.body.isCorrect;

    // const answerQuery = `UPDATE quiz SET is_correct = ? WHERE user_id = ? AND date = ?`;
    // const [result] = await pool.query(answerQuery, [isCorrect, userId, date]);

    // // 맞았을 경우 사용자의 pdi 추가
    // const addPointQuery = `UPDATE hold_stock SET avg_price = avg_price + 500 WHERE user_id = ? AND stock_id = 10`;
    // let result2;
    // if (isCorrect) {
    //     [result2] = await pool.query(addPointQuery, [userId]);
    // }
    // res.send({
    //     success: result.affectedRows,
    //     isCorrect: result2.affectedRows,
    // });
});

module.exports = router;
