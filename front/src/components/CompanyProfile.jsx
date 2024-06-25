import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const CompanyProfile = ({
    visible,
    onClose,
    image,
    stock,
    name,
    currentPrice,
}) => {
    const navigate = useNavigate();
    const userInfo = useSelector((state) => state.user.user);

    const goMarket = () => {
        navigate("/market");
    };

    return (
        <div
            className={`bg-[url('/imgs/companyprofile.png')] bg-no-repeat bg-center bg-contain w-full h-full scale-95 transition-transform duration-300 ${
                visible ? "translate-x-0" : "translate-x-full"
            }`}
        >
            <div className="relative top-[8vh] font-[TheJamsil5Bold] text-[14px] l:text-[16px] xl:text-[18px] 2xl:text-[20px] 3xl:text-[24px] flex justify-center">
                <div className="bg-wood-opacity-50 grid grid-row-4 place-items-center rounded-3xl w-3/5">
                    <div className="relative flex items-center row-span-1 justify-between mb-2">
                        {image && (
                            <div className="">
                                <img
                                    src={image}
                                    className="w-[5vw] h-[10vh] object-contain"
                                    alt="Company"
                                />
                            </div>
                        )}
                        <div>{name}</div>
                    </div>
                    <div className="grid grid-cols-1 gap-2 mb-4 row-span-2">
                        <div>나의 주식수 : {stock.quantity}개</div>
                        <div>평단가 : {stock.avg_price}원</div>
                        <div>현재가 : {currentPrice}</div>
                        <div>수익률 : {stock.returns}%</div>
                    </div>
                    <button
                        onClick={goMarket}
                        className="bg-yellow-500 text-white px-2 py-2 rounded hover:brightness-75 row-span-1"
                    >
                        팔러가기
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CompanyProfile;
