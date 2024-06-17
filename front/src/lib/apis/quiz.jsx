import axios from "axios";

const BASE_URL = "/api/quiz";
// const SHINHAN_URL = "https://documenter.getpostman.com/view/18293501/2s9YJezgcp" 추후 결정
const service = axios.create({ withCredentials: true, baseURL: BASE_URL });

// 퀴즈 응답 기록 요청
export async function UpdateQuiz() {
    const res = await service.post("/response");
    return res.data;
}

// 퀴즈 정답 확인 요청
export async function AnswerQuiz() {
    const res = await service.patch("/answer");
    return res.data;
}
