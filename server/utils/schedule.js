const schedule = require("node-schedule");
const axios = require("axios");
const https = require("https");
const moment = require("moment");
const pool = require("../config/db.connect");
const cron = require("node-cron");

const agent = new https.Agent({
    rejectUnauthorized: false,
});

// 신한투자증권 투자전략 API
const doJob = async () => {
    const date = moment().tz("Asia/Seoul").format("YYYY.MM.DD");
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
        let todayData;
        if (data[1].reg_date === date && data[1].content.length >= 300) {
            todayData = data[1].content;
        } else if (data[0].reg_date === date && data[0].content.length >= 300) {
            todayData = data[0].content;
        } else todayData = data[4].content;

        const query = `INSERT INTO quiz_news (date, content) VALUES (?,?)`;
        await pool.query(query, [date, todayData]);
    };
    // await executeJob();
    schedule.scheduleJob("0 30 8 * * *", executeJob);
};

const realCode = [
    ["005930", "삼성전자"],
    ["035720", "카카오"],
    ["041510", "SM"], //삼성전자 카카오 SM
    ["005380", "현대차"],
    ["068270", "셀트리온"],
    ["006360", "GS건설"], //현대차 셀트리온 GS건설
    ["090430", "아모레퍼시픽"],
    ["008770", "신라호텔"],
    ["051910", "LG화학"],
]; //아모레퍼시픽 신라호텔 LG화학

const doKIS = async () => {
    const executeJob = async () => {
        // 한국투자증권 API 연결 - OAuth2 토큰 받기
        // 요청 내용 작성, 요청 보내기
        const date = moment().tz("Asia/Seoul");
        const dateDay = date.day();
        if (dateDay === 0 || dateDay === 6) {
            //주말 확인
            console.log("주말입니다 !");
            return;
        }
        //오후 4시 확인
        const startOfDay = moment.tz("Asia/Seoul").startOf("day"); // 오늘의 시작 시간 (00:00:00)
        const endOfQuizTime = moment
            .tz("Asia/Seoul")
            .startOf("day")
            .add(16, "hours"); // 오늘의 오후 4시 (16:00:00)
        if (date.isBetween(startOfDay, endOfQuizTime)) {
            console.log("오후 4시 이전에는 퀴즈의 답을 확인할 수 없습니다.");
            console.log(date.format());
            return;
        }
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
                FID_INPUT_ISCD: realCode[i][0],
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
                const isUp =
                    todayCost > yesterdayCost
                        ? 1
                        : todayCost < yesterdayCost
                        ? 0
                        : 3;
                const query = `INSERT INTO quiz_answer (date, stock_id, stock_name, answer, today_cost, yesterday_cost) VALUES (?,?,?,?,?,?)`;
                await pool.query(query, [
                    today,
                    i + 1,
                    realCode[i][1],
                    isUp,
                    todayCost,
                    yesterdayCost,
                ]);
            } catch (e) {
                console.log(e);
            }
        }
    };
    // await executeJob();
    schedule.scheduleJob("0 35 8 * * *", executeJob); //한국시간 기준으로 변경
};

const doHoly = async () => {
    const executeJob = async () => {
        // 공공데이터 특일 정보 API 연결
        const year = moment().tz("Asia/Seoul").format("Y");
        const month = moment().tz("Asia/Seoul").format("MM");
        const HOLY_URL =
            "http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo";
        const params = {
            solYear: year,
            solMonth: month,
            ServiceKey: process.env.ServiceKey,
            _type: "json",
        };
        try {
            const holyReq = await axios.get(HOLY_URL, { params });
            const holyList = holyReq.data.response.body.items.item;
            if (holyList === null || holyList === undefined) {
                return;
            }
            const query = `INSERT INTO holiday VALUES (?,?)`;
            if (Array.isArray(holyList)) {
                holyList.map(async (elem, i) => {
                    const holiDate = moment(elem.locdate, "YYYYMMDD").format(
                        "YYYY-MM-DD"
                    );
                    await pool.query(query, [holiDate, elem.dateName]);
                });
            } else {
                const holiDate = moment(holyList.locdate, "YYYYMMDD").format(
                    "YYYY-MM-DD"
                );
                await pool.query(query, [holiDate, holyList.dateName]);
            }
            if (month == "05") {
                const holiDate = moment(`${year}${month}01`, "YYYYMMDD").format(
                    "YYYY-MM-DD"
                );
                await pool.query(query, [holiDate, "근로자의 날"]);
            }
            if (month == "12") {
                var lastDate = moment(`${year}${month}31`, "YYYYMMDD");
                while (lastDate.day() == 0 || lastDate.day() == 6) {
                    lastDate = lastDate.subtract(1, "days");
                }
                const holiDate = moment(lastDate).format("YYYY-MM-DD");
                console.log(holiDate);
                await pool.query(query, [holiDate, "올해 마지막 평일"]);
            }
        } catch (e) {
            console.log(e);
        }
    };
    await executeJob();
    const schedule = cron.schedule(
        "0 0 0 1 * *",
        () => {
            executeJob();
        },
        {
            timezone: "Asia/Seoul",
        }
    );
    schedule.start();
};

module.exports = { doJob, doKIS, doHoly };
