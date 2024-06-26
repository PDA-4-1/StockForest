import React, { useState, useEffect } from "react";
import axios from "axios";

const Modal = ({ show, onClose, children }) => {
    if (!show) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg relative w-[30vw] h-3/4 overflow-scroll">
                <button
                    className="absolute top-0 right-3 m-2"
                    onClick={onClose}
                >
                    &times;
                </button>
                {children}
            </div>
        </div>
    );
};

const Tabs = ({ activeTab, onTabChange }) => {
    const tabs = [
        { label: "전체", value: 2 },
        { label: "구입", value: 1 },
        { label: "판매", value: 0 },
    ];

    return (
        <div className="flex justify-around mb-4">
            {tabs.map((tab) => (
                <button
                    key={tab.label}
                    className={`px-4 py-2 ${
                        activeTab === tab.value ? "bg-gray-300" : ""
                    }`}
                    onClick={() => onTabChange(tab.value)}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
};

const StockSelector = ({ stocks, onSelect }) => {
    return (
        <div className="mb-4">
            <select
                onChange={(e) => onSelect(e.target.value)}
                className="w-full p-2 border rounded"
            >
                {stocks.map((stock, index) => (
                    <option key={index} value={index}>
                        {stock}
                    </option>
                ))}
            </select>
        </div>
    );
};

const StockHistoryButton = () => {
    const [showModal, setShowModal] = useState(false);
    const [activeTab, setActiveTab] = useState(2); // Default to 전체
    const [selectedStock, setSelectedStock] = useState(0);
    const [historyData, setHistoryData] = useState([]);
    const [totalProfit, setTotalProfit] = useState(0);
    const [hasHistory, setHasHistory] = useState(false);

    const stocks = [
        "전체",
        "콩순전자",
        "도토리톡",
        "뉴진수퍼노바",
        "주식회사붕붕",
        "미미네약국",
        "철수건설",
        "올리브업",
        "숲속여관",
        "과학나라",
    ];

    const stockDetails = {
        0: { name: "전체", image: null },
        1: { name: "콩순전자", image: "/imgs/field/tomato/tomato1.png" },
        2: { name: "도토리톡", image: "/imgs/field/banana/banana1.png" },
        3: {
            name: "뉴진수퍼노바",
            image: "/imgs/field/blueberry/blueberry1.png",
        },
        4: { name: "주식회사붕붕", image: "/imgs/field/peach/peach1.png" },
        5: { name: "미미네약국", image: "/imgs/field/orange/orange1.png" },
        6: { name: "철수건설", image: "/imgs/field/melon/melon1.png" },
        7: { name: "올리브업", image: "/imgs/field/grape/grape1.png" },
        8: { name: "숲속여관", image: "/imgs/field/apple/apple1.png" },
        9: {
            name: "과학나라",
            image: "/imgs/field/strawberry/strawberry1.png",
        },
    };

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const handleStockSelect = (stock) => {
        setSelectedStock(stock);
    };

    useEffect(() => {
        if (showModal) {
            const fetchHistory = async () => {
                try {
                    const response = await axios.get(
                        `api/history/${selectedStock}/${activeTab}`
                    );
                    if (response.data.code === 1) {
                        const data = response.data.result;
                        setHistoryData(data);
                        console.log(data);

                        let profit = 0;
                        data.forEach((item) => {
                            if (item.is_buy === 1) {
                                profit -= item.price * item.quantity;
                            } else {
                                profit += item.price * item.quantity;
                            }
                        });

                        setTotalProfit(profit);
                        setHasHistory(true);
                    } else {
                        setHistoryData([]);
                        setTotalProfit(0);
                        setHasHistory(false);
                    }
                } catch (error) {
                    console.error("오류 발생:", error);
                    setHistoryData([]);
                    setTotalProfit(0);
                    setHasHistory(false);
                }
            };

            fetchHistory();
        }
    }, [showModal, selectedStock, activeTab]);

    return (
        <div>
            <button
                className="bg-yellow-300 px-3 py-1 border-black rounded-[10px] cursor-pointer hover:brightness-75 mr-[10px]"
                onClick={handleOpenModal}
            >
                기록 보기
            </button>

            <Modal show={showModal} onClose={handleCloseModal}>
                <h2>나의 거래 기록</h2>
                <StockSelector stocks={stocks} onSelect={handleStockSelect} />
                <Tabs activeTab={activeTab} onTabChange={handleTabChange} />
                <div className="flex-grow">
                    {hasHistory ? (
                        <ul>
                            {historyData.map((item, index) => (
                                <li
                                    key={index}
                                    className="flex items-center mb-4"
                                >
                                    {stockDetails[item.stock_id] &&
                                    stockDetails[item.stock_id].image ? (
                                        <img
                                            src={
                                                stockDetails[item.stock_id]
                                                    .image
                                            }
                                            alt={
                                                stockDetails[item.stock_id].name
                                            }
                                            className="w-12 h-12 mr-4 object-contain"
                                        />
                                    ) : null}
                                    <div className="flex flex-col">
                                        <strong
                                        >
                                            {stockDetails[item.stock_id]
                                                ? stockDetails[item.stock_id]
                                                      .name
                                                : "Unknown"}
                                        </strong>{" "}
                                        {item.is_buy === 1 ? (
                                            <span className="text-red-500">구입</span>
                                        ) : (
                                            <span className="text-blue-500">판매</span>
                                        )}
                                        <div className="flex items-center">
                                            <img
                                                src="/imgs/money.svg"
                                                alt="money"
                                                className="w-6 h-6 mr-2"
                                            />
                                            <span>{item.price}프디</span>
                                        </div>
                                        <span>
                                            수량: {item.quantity}개, 턴:{" "}
                                            {item.turn}
                                        </span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>기록이 없습니다.</p>
                    )}
                </div>
                <div className="mt-4 flex justify-end">
                    <strong>총 이익: {totalProfit}원</strong>
                </div>
            </Modal>
        </div>
    );
};

export default StockHistoryButton;
