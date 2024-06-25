import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import moment from "moment-timezone";
import { FaChevronDown } from "react-icons/fa";
import { FaChevronUp } from "react-icons/fa";
import { TbTriangleFilled } from "react-icons/tb";
import { TbTriangleInvertedFilled } from "react-icons/tb";
import { ContentQuiz, AnswerQuiz, UpdateQuiz } from "~/lib/apis/quiz";
import QuizModal from "../../components/QuizModal";
import QuizAnswerModal from "../../components/QuizAnswerModal";

const Quiz = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isUpDownOpen, setIsUpDownOpen] = useState(false);
    const [stockName, setStockName] = useState("주식 이름");
    const [stockId, setStockId] = useState(0);
    const [date, setDate] = useState("2024-06-18");
    const [upDown, setUpDown] = useState(true); //상승이면 true
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

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const upDownToggleDropdown = () => {
        setIsUpDownOpen(!isUpDownOpen);
    };

    //date 설정 -> 오늘 날짜로 설정하기(서울 기준)
    useEffect(() => {
        const currentDate = moment().tz("Asia/Seoul").format("YYYY-MM-DD");
        setDate(currentDate);

        async function getContent() {
            const data = await ContentQuiz();
            setQuizNews(data.content);
        }
        getContent();
    }, []);

    // const changeToUp = () => {
    //     setUpDown(true);
    // };

    // const changeToDown = () => {
    //     setUpDown(false);
    // };

    const postAnswer = async () => {
        const result = await UpdateQuiz(stockId, date, upDown);
        console.log(result);
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
        <div className="bg-background-pattern bg-cover bg-center h-screen">
            <Navbar />
            <div className="h-300px relative flex items-center">
                <div className="w-full h-[300px] pl-50 bg-contain bg-center bg-[url('https://stockforest.s3.ap-northeast-2.amazonaws.com/quiz/quiz_back.png')] bg-no-repeat">
                    <div className="relative w-1/2 top-[100px] left-[20vw] ">
                        <div>{truncateText(quizNews, 150)}</div>
                        <button
                            className="absolute right-0 text-center text-sky-400 flex items-center justify-evenly"
                            onClick={() => setModalSee(true)}
                        >
                            더보기
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex flex-row">
                <div className="basis-1/3 flex justify-end relative">
                    <div className="relative px-1">
                        <button
                            type="button"
                            className="inline-flex items-center justify-between w-60 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            onClick={toggleDropdown}
                        >
                            {stockName}
                            {isOpen ? <FaChevronDown /> : <FaChevronUp />}
                        </button>

                        {isOpen && (
                            <div className="origin-top-right absolute right-0 top-full mt-0 w-60 max-h-60 overflow-y-auto rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                                <div
                                    className="py-1"
                                    role="menu"
                                    aria-orientation="vertical"
                                    aria-labelledby="options-menu"
                                >
                                    <a
                                        href="#"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        role="menuitem"
                                        onClick={() => {
                                            setStockId(1);
                                            setStockName("삼성전자");
                                            toggleDropdown();
                                        }}
                                    >
                                        삼성전자
                                    </a>
                                    <a
                                        href="#"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        role="menuitem"
                                        onClick={() => {
                                            setStockId(2);
                                            setStockName("카카오");
                                            toggleDropdown();
                                        }}
                                    >
                                        카카오
                                    </a>
                                    <a
                                        href="#"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        role="menuitem"
                                        onClick={() => {
                                            setStockId(3);
                                            setStockName("SM");
                                            toggleDropdown();
                                        }}
                                    >
                                        SM
                                    </a>
                                    <a
                                        href="#"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        role="menuitem"
                                        onClick={() => {
                                            setStockId(4);
                                            setStockName("현대차");
                                            toggleDropdown();
                                        }}
                                    >
                                        현대차
                                    </a>
                                    <a
                                        href="#"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        role="menuitem"
                                        onClick={() => {
                                            setStockId(5);
                                            setStockName("셀트리온");
                                            toggleDropdown();
                                        }}
                                    >
                                        셀트리온
                                    </a>
                                    <a
                                        href="#"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        role="menuitem"
                                        onClick={() => {
                                            setStockId(6);
                                            setStockName("GS건설");
                                            toggleDropdown();
                                        }}
                                    >
                                        GS건설
                                    </a>
                                    <a
                                        href="#"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        role="menuitem"
                                        onClick={() => {
                                            setStockId(7);
                                            setStockName("아모레퍼시픽");
                                            toggleDropdown();
                                        }}
                                    >
                                        아모레퍼시픽
                                    </a>
                                    <a
                                        href="#"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        role="menuitem"
                                        onClick={() => {
                                            setStockId(8);
                                            setStockName("신라호텔");
                                            toggleDropdown();
                                        }}
                                    >
                                        신라호텔
                                    </a>
                                    <a
                                        href="#"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        role="menuitem"
                                        onClick={() => {
                                            setStockId(9);
                                            setStockName("LG화학");
                                            toggleDropdown();
                                        }}
                                    >
                                        LG화학
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex basis-1/3 items-center">
                    <div className="relative flex basis-1/2 justify-between px-1">
                        <button
                            type="button"
                            className="inline-flex items-center justify-between w-60 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            onClick={upDownToggleDropdown}
                        >
                            {upDown ? "상승":"하락"}
                            {isUpDownOpen ? <FaChevronDown /> : <FaChevronUp />}
                        </button>

                        {isUpDownOpen && (
                            <div className="origin-top-right absolute right-0 top-full mt-0 w-60 max-h-60 overflow-y-auto rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                                <div
                                    className="py-1"
                                    role="menu"
                                    aria-orientation="vertical"
                                    aria-labelledby="options-menu"
                                >
                                    <a
                                        href="#"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        role="menuitem"
                                        onClick={() => {
                                            setUpDown(1);
                                            upDownToggleDropdown();
                                        }}
                                    >
                                        <div className="flex text-center items-center justify-evenly">
                                            <TbTriangleFilled />
                                            상승
                                        </div>
                                    </a>
                                    <a
                                        href="#"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        role="menuitem"
                                        onClick={() => {
                                            setUpDown(0);
                                            upDownToggleDropdown();
                                        }}
                                    >
                                        <div className="flex text-center items-center justify-evenly">
                                            <TbTriangleInvertedFilled />
                                            하락
                                        </div>
                                    </a>
                                </div>
                            </div>
                        )}

                    </div>
                    <div className="basis-1/2 flex justify-center">
                        <button
                            className="w-40 text-center"
                            onClick={postAnswer}
                        >
                            저장
                        </button>
                    </div>
                </div>
                <div className="basis-1/3 flex justify-start">
                    <button className="text-center" onClick={checkAnswer}>
                        어제 푼 퀴즈 확인하기
                    </button>
                </div>
            </div>
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
