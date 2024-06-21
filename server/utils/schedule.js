const schedule = require("node-schedule");
const axios = require("axios");
const https = require("https");
const moment = require("moment");
const pool = require("../config/db.connect");

const agent = new https.Agent({
    rejectUnauthorized: false,
});

const date = moment().format("YYYY.MM.DD");

const doJob = async () => {
    const executeJob = async () => {
        const config = {
            method: "get",
            maxBodyLength: Infinity,
            url: "https://gapi.shinhansec.com:8443/openapi/v1.0/strategy/invest",
            headers: {
                apiKey: "l7xxR7Fe0dP3i8KPZaPKpknI2vWrMeJfwDpk",
            },
            httpsAgent: agent,
        };
        const res = await axios(config);
        const data = res.data.dataBody.list;
        // console.log(data);
        let todayData;
        if (data[1].reg_date === date && data[1].content.length >= 300) {
            todayData = data[1].content;
        } else if (data[0].reg_date === date && data[0].content.length >= 300) {
            todayData = data[0].content;
        } else todayData = data[4].content;
        // console.log(todayData.length);

        const query = `INSERT INTO quiz_news (date, content) VALUES (?,?)`;
        await pool.query(query, [date, todayData]);
    };
    // await executeJob();
    schedule.scheduleJob("0 0 8 * * *", executeJob);
};

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

const doKIS = async () => {
    const executeJob = async () => {
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

        // 한국투자증권 API 연결 - 일일 주가 요청하기
        const yesterday = moment()
            .tz("Asia/Seoul")
            .subtract(1, "days")
            .format("YYYY-MM-DD"); // 하루 전 날
        const today = moment(yesterday).add(1, "days").format("YYYY-MM-DD");
        console.log("today: " + today);
        const startDate = moment(yesterday).format("YYYYMMDD");
        const endDate = moment(yesterday).add(1, "days").format("YYYYMMDD");

        const KIS_URL =
            "https://openapi.koreainvestment.com:9443/uapi/domestic-stock/v1/quotations/inquire-daily-itemchartprice";
        headers = {
            "content-type": "application/json",
            authorization: `Bearer ${accessToken}`,
            appkey: process.env.appKey,
            appsecret: process.env.appSecret,
            tr_id: process.env.tr_id,
        };

        for (let i = 0; i < realCode.length; i++) {
            const params = {
                FID_COND_MRKT_DIV_CODE: "J",
                FID_INPUT_ISCD: realCode[i],
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
                const isUp =
                    todayCost > yesterdayCost
                        ? 1
                        : todayCost < yesterdayCost
                        ? 0
                        : 3;
                const query = `INSERT INTO quiz_answer (date, stock_id, answer) VALUES (?,?,?)`;
                const [res] = await pool.query(query, [today, i + 1, isUp]);
                console.log(res.insertId);
            } catch (e) {
                console.log(e);
            }
        }
    };
    // await executeJob();
    schedule.scheduleJob("0 0 17 * * *", executeJob);
}

module.exports = {doJob, doKIS};
