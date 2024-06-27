// UpDownDropdown.jsx

import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { TbTriangleFilled, TbTriangleInvertedFilled } from "react-icons/tb";

const UpDownDropdown = ({ upDown, setUpDown }) => {
    const [isUpDownOpen, setIsUpDownOpen] = useState(false);

    const upDownToggleDropdown = () => {
        setIsUpDownOpen(!isUpDownOpen);
    };

    return (
        <div className="relative">
            <button
                type="button"
                className="inline-flex items-center justify-between w-60 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={upDownToggleDropdown}
            >
                {upDown ? "상승" : "하락"}
                {isUpDownOpen ? <FaChevronDown /> : <FaChevronUp />}
            </button>
            {isUpDownOpen && (
                <div className="absolute right-0 top-full mt-0 w-60 max-h-60 overflow-y-auto rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
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
    );
};

export default UpDownDropdown;
