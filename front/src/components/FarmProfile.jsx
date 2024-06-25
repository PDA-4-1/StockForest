import React from "react";
import { useSelector } from "react-redux";

const FarmProfile = (props) => {
    const userInfo = useSelector((state) => state.user.user);

    const imgs = {
        1: "https://stockforest.s3.ap-northeast-2.amazonaws.com/profile_img/moli.png",
        2: "https://stockforest.s3.ap-northeast-2.amazonaws.com/profile_img/pli.png",
        3: "https://stockforest.s3.ap-northeast-2.amazonaws.com/profile_img/lululala.png",
        4: "https://stockforest.s3.ap-northeast-2.amazonaws.com/profile_img/sol.png",
    };

    return (
        <div className="w-full h-full row-span-2 bg-[url('/imgs/pat.png')] bg-no-repeat bg-center bg-contain flex flex-col justify-center items-center space-y-3">
            <div className="space-y-2 w-1/2 h-1/2 mt-[8vh] p-2 rounded-lg text-black text-[14px] 2xl:text-[20px] 3xl:text-[24px] font-[TheJamsil5Bold] bg-wood-opacity-50">
                <div className="flex items-center space-x-3 justify-around h-1/2">
                    <div className="w-11 h-11 rounded-full bg-white">
                        <img src={imgs[userInfo.img]}/>
                    </div>
                    <div className="text-left ">
                        <div>{userInfo.nickname}</div>
                        <div className="mt-1">
                            수익률: {userInfo.user_returns || 0}%
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-around h-1/2">
                    <img
                        src="/imgs/money.svg"
                        alt="자산"
                        className="w-10 h-10"
                    />
                    <div className="ml-[5px]">{userInfo.user_pdi} 프디</div>
                </div>
            </div>
        </div>
    );
};

export default FarmProfile;
