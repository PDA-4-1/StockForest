var express = require("express");
var pool = require("../../config/db.connect.js");
const axios = require("axios");
const dotenv = require("dotenv");
const moment = require("moment-timezone");
var router = express.Router();

dotenv.config();

const realCode = [
    "005930",
    "035720",
    "041510", //삼성전자 카카오 SM
    "005380",
    "068270",
    "006360", //현대차 셀트리온 GS건설
    "090430",
    "008770",
    "051910",
]; //아모레퍼시픽 신라호텔 LG화학

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

    // 사용자가 응답한 기록 불러오기
    const yesterday = moment()
        .tz("Asia/Seoul")
        .subtract(1, "days")
        .format("YYYY-MM-DD"); // 하루 전 날
    console.log(yesterday);
    getResponseSQL = `SELECT stock_id, up_down FROM quiz WHERE user_id = ? AND date = ?`;
    const [userResponse] = await pool.query(getResponseSQL, [req.userId, yesterday]);
    if (userResponse.length == 0)
        throw new Error("어제의 퀴즈 기록이 없습니다");
    console.log(userResponse[0]);

    // 한국투자증권 API 연결 - 일일 주가 요청하기
    const stockCode = realCode[userResponse[0].stock_id - 1];
    const startDate = moment(yesterday).format("YYYYMMDD");
    const endDate = moment(yesterday).add(1, "days").format("YYYYMMDD");
    console.log("stockCode: " + stockCode);
    console.log("startDate: " + startDate);
    console.log("endDate: " + endDate);
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
        FID_INPUT_ISCD: stockCode,
        FID_INPUT_DATE_1: startDate,
        FID_INPUT_DATE_2: endDate,
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
    try {
        let isUp, isCorrect;
        if (todayCost == yesterdayCost)
            isCorrect = 0; // 가격 변동 없으면 오답처리
        else {
            isUp = todayCost > yesterdayCost ? 1 : 0;
            isCorrect = userResponse[0].up_down == isUp ? 1 : 0; // 정답 여부
        }
        const answerQuery = `UPDATE quiz SET is_correct = ? WHERE user_id = ? AND date = ?`;
        await pool.query(answerQuery, [isCorrect, req.userId, yesterday]);

        // 맞았을 경우 사용자의 pdi 추가
        if (isCorrect) {
            const addPointQuery = `UPDATE hold_stock SET avg_price = avg_price + 500 WHERE user_id = ? AND stock_id = 10`;
            await pool.query(addPointQuery, [req.userId]);
        }

        res.send({
            stockCode: stockCode, // 고른 종목
            answerCheck: isUp, //가격이 올랐나?
            isCorrect: isCorrect, // 사용자가 맞았나?
        });
    } catch (e) {
        console.log(e);
    }
});

module.exports = router;
