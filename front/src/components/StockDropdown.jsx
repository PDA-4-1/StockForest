//StockDropdown.jsx

import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const StockDropdown = ({ stockName, setStockName, setStockId }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="relative">
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
    );
};

export default StockDropdown;
