import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const Profile = () => {
    const [userInfo, setUserInfo] = useState([]);
    const userInfoAPI = `/api/users`;

    useEffect(() => {
        const fetchuUserInfo = async () => {
            //userInfo 초기화
            await axios
                .get(userInfoAPI)
                .then((res) => {
                    setUserInfo(res.data);
                })
                .catch((err) => {
                    console.error(
                        "초기 유저 정보를 불러오는데 실패했습니다.",
                        err
                    );
                });
        };
        fetchuUserInfo();
    }, []);

    return (
        <div className="w-full h-full scale-200 bg-[url('/imgs/loginform.svg')] bg-no-repeat bg-center bg-cover flex flex-col justify-center items-center">
            <div className="flex justify-center items-center">
                <div className="w-[50px] h-[50px] rounded-full bg-black mr-4">
                    <img>{/* {userInfo.img} */}</img>
                </div>
                <div className="text-left">
                    <div>{userInfo.nickname}</div>
                    <div className="mt-[10px]">
                        수익률: {userInfo.user_returns}%
                    </div>
                </div>
            </div>

            <div className="mt-[30px] flex items-center">
                <img src="/imgs/money.svg" alt="자산" />
                <div className="ml-[5px]">{userInfo.user_pdi} 프디</div>
            </div>

            <div className="flex items-center mt-[30px] justify-center gap-3">
                <div>{userInfo.turn}턴</div>
                <button className="bg-yellow-500 text-white px-4 py-2 rounded">
                    다음 턴
                </button>
            </div>
        </div>
    );
};

export default Profile;
