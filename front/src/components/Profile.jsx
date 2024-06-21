import React from "react";
import { useSelector } from "react-redux";

const Profile = (props) => {
    const userInfo = useSelector((state) => state.user.user);
    const nextTurn = props.nextTurn;

    return (
        <div className="w-full h-full row-span-2 bg-[url('/imgs/loginform.svg')] bg-no-repeat bg-center bg-auto flex flex-col justify-center items-center space-y-3">
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
