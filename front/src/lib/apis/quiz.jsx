import axios from "axios";
import moment from "moment-timezone";

const BASE_URL = "/api/quiz";
const SHINHAN_URL = "/shin-api";
const service = axios.create({ withCredentials: true, baseURL: BASE_URL });
const shinhanService = axios.create({ baseURL: SHINHAN_URL });

const realName = [
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

// 퀴즈 응답 기록 요청
export async function UpdateQuiz(stockId, date, upDown) {
    const res = await service.post("/response", {
        userId: 10,
        stockId: stockId,
        date: date,
        upDown: upDown,
    });
    return res.data;
}

// 퀴즈 정답 확인 요청
export async function AnswerQuiz() {
    const res = await service.patch("/answer");
    return res.data;
}

// 일봉 데이터 요청
export async function dailyStock(date) {
    const token = await shinhanService.post("/oauth2/tokenP", {
        headers: {
            grant_type: "client_credentials",
            appkey: import.meta.env.VITE_appKey,
            appsecret: import.meta.env.VITE_appSecret,
        },
    });
    console.log(token);
    const accToken = token.access_token;
    const endDate = moment(date).format("YYYYMMDD");
    const startDate = moment(date).subtract(1, "days").format("YYYYMMDD");
    const res = await shinhanService.get(
        "/uapi/domestic-stock/v1/quotations/inquire-daily-itemchartprice",
        {   
            headers: {
                authorization: accToken,
                appkey: import.meta.env.VITE_appKey,
                appsecret: import.meta.env.VITE_appSecret,
                tr_id: import.meta.env.VITE_tr_id,
            },
            body: {
                fid_cond_mrkt_div_code: "J", //주식
                fid_input_iscd: "005930", //종목코드
                fid_input_date_1: startDate, //시작일자
                fid_input_date_2: endDate, //종료일자
                fid_period_div_code: "D", //일봉
                fid_org_adj_prc: "0", //수정주가
            },
        }
    );
    // console.log(res);
}
