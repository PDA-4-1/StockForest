import React from "react";
import { useSelector } from "react-redux";

const FarmProfile = (props) => {
    const userInfo = useSelector((state) => state.user.user);

    return (
        <div className="w-full h-full row-span-2 bg-[url('/imgs/pat.png')] bg-no-repeat bg-center bg-contain flex flex-col justify-center items-center space-y-3">
            <div className="space-y-2 w-1/2 h-1/2 mt-[8vh] text-[8px] 2xl:text-[15px] 3xl:text-[15px] bg-black bg-opacity-50 p-2 rounded-lg">
                <div className="flex items-center space-x-3 justify-between h-1/2">
                    <div className="w-10 h-10 rounded-full bg-black">
                        <img>{/* {userInfo.img} */}</img>
                    </div>
                    <div className="text-left text-white">
                        <div>{userInfo.nickname}</div>
                        <div className="mt-1">
                            수익률: {userInfo.user_returns || 0}%
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between h-1/2">
                    <img
                        src="/imgs/money.svg"
                        alt="자산"
                        className="w-10 h-10"
                    />
                    <div className="ml-[5px] text-white">
                        {userInfo.user_pdi} 프디
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FarmProfile;
