import React from "react";
import { useState, useEffect } from "react";
import { GetUserProfile } from "../lib/apis/user";
import { NextTurn } from "../lib/apis/stock";
import { useDispatch, useSelector } from "react-redux";
import { saveUser } from "../store/userSlice";

const Profile = () => {
    const userInfo = useSelector((state) => state.user.user);
    const dispatch = useDispatch();
    const nextTurn = () => {
        NextTurn(userInfo.turn, 16)
            .then((data) => console.log(data))
            .catch((err) => console.log(err.response));
    };

    useEffect(() => {
        GetUserProfile()
            .then((data) => {
                console.log(data);
                dispatch(saveUser(data));
            })
            .catch((err) => console.log(err.response));
    }, []);

    return (
        <div className="w-full h-full row-span-2 scale-110 bg-[url('/imgs/loginform.svg')] bg-no-repeat bg-center bg-cover flex flex-col justify-center items-center space-y-3">
            <div className="flex items-center space-x-3 min-w-40">
                <div className="w-10 h-10 rounded-full bg-black">
                    <img>{/* {userInfo.img} */}</img>
                </div>
                <div className="text-left">
                    <div>{userInfo.nickname}</div>
                    <div className="mt-1">수익률: {userInfo.user_returns || 0}%</div>
                </div>
            </div>

            <div className="flex items-center min-w-40 justify-between">
                <img src="/imgs/money.svg" alt="자산" className="w-10 h-10" />
                <div className="ml-[5px]">{userInfo.user_pdi} 프디</div>
            </div>

            <div className="flex items-center justify-between min-w-40">
                <div className="min-w-[44px] text-center">{userInfo.turn} 턴</div>
                <button className="bg-yellow-500 text-white px-4 py-2 rounded hover:brightness-75" onClick={nextTurn}>
                    다음 턴
                </button>
            </div>
        </div>
    );
};

export default Profile;
