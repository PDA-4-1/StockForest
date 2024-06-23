import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import moment from "moment-timezone";
import { FaChevronDown } from "react-icons/fa";
import { FaChevronUp } from "react-icons/fa";
import { TbTriangleFilled } from "react-icons/tb";
import { TbTriangleInvertedFilled } from "react-icons/tb";
import { dailyStock, UpdateQuiz } from "~/lib/apis/quiz";

const Quiz = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [stockName, setStockName] = useState("주식 이름");
    const [stockId, setStockId] = useState(0);
    const [date, setDate] = useState("2024-06-18");
    const [upDown, setUpDown] = useState(true); //상승이면 true

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    //date 설정 -> 오늘 날짜로 설정하기(서울 기준)
    useEffect(() => {
        const currentDate = moment().tz("Asia/Seoul").format("YYYY-MM-DD");
        setDate(currentDate);

        console.log("appKey: " + import.meta.env.VITE_appKey);
        const getQuizData = async () => {
            await dailyStock(date);
        };
        getQuizData();
    }, []);

    useEffect(() => {
        console.log(upDown);
    }, [upDown]);

    const changeToUp = () => {
        setUpDown(true);
    };

    const changeToDown = () => {
        setUpDown(false);
    };

    const postAnswer = async () => {
        const result = await UpdateQuiz(stockId, date, upDown);
        console.log(result);
    };
    /* 퀴즈 내용 불러오기
        
    */
    // 어제자 답 확인 클릭 시 -> 한국투자증권 api 요청해서 정답여부 확인

    return (
        <div className="bg-background-pattern bg-cover bg-center h-screen">
            <Navbar />
            <div className="flex flex-row">
                <div className="basis-1/2 flex justify-center">
                    <button
                        type="button"
                        className="inline-flex items-center justify-between w-60 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={toggleDropdown}
                    >
                        {stockName}
                        {isOpen ? <FaChevronDown /> : <FaChevronUp />}
                    </button>
                </div>

                {isOpen && (
                    <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
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
                <div className="flex basis-1/2 items-center">
                    <div className="flex basis-1/2 justify-between">
                        <button
                            className="basis-1/2 text-center flex items-center justify-evenly"
                            onClick={changeToUp}
                        >
                            <TbTriangleFilled />
                            상승버튼
                        </button>
                        <button
                            className="basis-1/2 text-center flex items-center justify-evenly"
                            onClick={changeToDown}
                        >
                            <TbTriangleInvertedFilled />
                            하락버튼
                        </button>
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
            </div>
        </div>
    );
};

export default Quiz;
