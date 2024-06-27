import React, { useState, useEffect } from "react";
import Navbar from "~/components/Navbar";
import moment from "moment-timezone";
import {
    ContentQuiz,
    AnswerQuiz,
    UpdateQuiz,
    checkHoly,
} from "~/lib/apis/quiz";
import QuizModal from "~/components/QuizModal";
import QuizAnswerModal from "~/components/QuizAnswerModal";
import StockDropdown from "~/components/StockDropdown";
import UpDownDropdown from "~/components/UpDownDropdown";
import { Toast } from "../../components/Toast";

const Quiz = () => {
    const [stockName, setStockName] = useState("주식 이름");
    const [stockId, setStockId] = useState(0);
    const [date, setDate] = useState("2024-06-18");
    const [upDown, setUpDown] = useState(true); // 상승이면 true
    const [quizNews, setQuizNews] = useState("");
    const [modalSee, setModalSee] = useState(false);
    const [answerModalSee, setAnswerModalSee] = useState(false);
    const [result, setResult] = useState({
        code: 2,
        answerCheck: 0,
        isCorrect: 0,
        stockName: "",
        todayCost: 0,
        yesterdayCost: 0,
    });
    const [isHoly, setIsHoly] = useState(false);
    const [dateName, setDateName] = useState("");

    // date 설정 -> 오늘 날짜로 설정하기(서울 기준)
    useEffect(() => {
        const currentDate = moment().tz("Asia/Seoul").format("YYYY-MM-DD");
        setDate(currentDate);

        async function getHoly() {
            const data = await checkHoly(currentDate);
            setDateName(data.date_name);
            setIsHoly(data.isHoly);
        }
        async function getContent() {
            const data = await ContentQuiz();
            setQuizNews(data.content);
        }
        getHoly();
        if (!isHoly) getContent();
    }, []);

    const postAnswer = async () => {
        const result = await UpdateQuiz(stockId, date, upDown);
        Toast.fire("성공적으로 저장되었습니다!", "", "success");
    };

    const checkAnswer = async () => {
        const result = await AnswerQuiz();
        console.log(result);
        setResult({
            code: result.code,
            answerCheck: result.answerCheck,
            isCorrect: result.isCorrect,
            stockName: result.stockName,
            todayCost: result.todayCost,
            yesterdayCost: result.yesterdayCost,
        });
        console.log("result: " + result);
        setAnswerModalSee(true);
    };

    const truncateText = (text, length) => {
        if (text.length <= length) {
            return text;
        }
        return text.substring(0, length) + "...";
    };

    return (
        <div className="bg-background-pattern bg-cover bg-center h-screen ">
            <Navbar />
            {console.log("isHoly : " + isHoly)}
            {isHoly ? (
                <div className="flex justify-center">
                    <div className="w-[1034px] h-[315px] mt-[50px] pl-50 bg-[url('imgs/quiz_back.png')] flex justify-center items-center scale-[0.8] m:scale-[0.9] l:scale-[1]">
                        <div className="w-2/3 relative right-[60px]">
                            <div className="text-center">오늘은 {dateName}이기 때문에 주식장이 안 열립니다!</div>
                            <div className="text-center">퀴즈는 다음에 만나요 !</div>
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    <div className="flex justify-center">
                        <div className="w-[1034px] h-[315px] mt-[50px] pl-50 bg-[url('imgs/quiz_back.png')] flex justify-center items-center scale-[0.8] m:scale-[0.9] l:scale-[1]">
                            <div className="w-2/3 relative right-[60px]">
                                <div>{truncateText(quizNews, 150)}</div>
                                <button
                                    className="flex ml-auto text-sky-400"
                                    onClick={() => setModalSee(true)}
                                >
                                    더보기
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center mt-4">
                        <div className="flex items-center gap-4">
                            <StockDropdown
                                stockName={stockName}
                                setStockName={setStockName}
                                setStockId={setStockId}
                            />
                            <UpDownDropdown
                                upDown={upDown}
                                setUpDown={setUpDown}
                            />
                            <div className="flex justify-center w-full">
                                <button
                                    className="w-40 text-center bg-black text-white px-4 py-2 rounded-md"
                                    onClick={postAnswer}
                                >
                                    저장
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center w-full mt-5">
                        <button
                            className="text-center bg-yellow-500 text-white px-4 py-2 rounded-md"
                            onClick={checkAnswer}
                        >
                            어제 푼 퀴즈 확인하기
                        </button>
                    </div>
                </div>
            )}
            {modalSee && (
                <QuizModal
                    onHide={() => setModalSee(false)}
                    content={quizNews}
                />
            )}
            {answerModalSee && (
                <QuizAnswerModal
                    onHide={() => setAnswerModalSee(false)}
                    result={result}
                />
            )}
        </div>
    );
};

export default Quiz;
