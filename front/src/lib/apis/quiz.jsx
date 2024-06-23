import axios from "axios";
import moment from "moment-timezone";

const BASE_URL = "/api/quiz";
const SHINHAN_URL = "/shin-api";
const service = axios.create({ withCredentials: true, baseURL: BASE_URL });
const shinhanService = axios.create({ baseURL: SHINHAN_URL });


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
