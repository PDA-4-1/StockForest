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
            className={`bg-[url('/imgs/companyprofile.svg')] bg-no-repeat bg-center bg-contain w-full h-full scale-95 transition-transform duration-300 ${
                visible ? "translate-x-0" : "translate-x-full"
            }`}
        >
            <div className="relative top-[5vh] left-[3vw] flex items-center">
                {image && (
                    <div className="w-[10vw] h-[10vh]">
                        <img
                            src={image}
                            className="w-full h-full object-contain"
                            alt="Company"
                        />
                    </div>
                )}
                <div>{name}</div>
            </div>
            <div className="relative grid grid-cols-1 gap-4 mb-4 top-[10vh] left-[7vw]">
                <div>나의 주식수 : {stock.quantity}개</div>
                <div>평단가 : {stock.avg_price}원</div>
                <div>현재가 : {currentPrice}</div>
                <div>수익률 : {stock.returns}%</div>
            </div>
            <button
                onClick={goMarket}
                className="relative top-[15vh] left-[10vw] bg-yellow-500 text-white px-4 py-2 rounded hover:brightness-75"
            >
                팔러가기
            </button>
        </div>
    );
};

export default CompanyProfile;
