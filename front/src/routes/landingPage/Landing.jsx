import React from "react";
import Landing3D from "../../components/Landing3D";

const Landing = () => {
    return (
        <div className="bg-background-pattern flex flex-col bg-cover bg-center h-screen">
            <div className="flex justify-center pt-5 scale-75">
                <img
                    src="/imgs/loginlogo.svg"
                    alt="로그인로고"
                    className="max-400:w-[300px]"
                />{" "}
            </div>
            <div className="flex justify-center space-x-10 ">
                <button className="mt-6 p-2 bg-yellow-400 rounded w-full max-w-md md:max-w-xs">
                    로그인
                </button>

                <button className="mt-6 p-2 bg-yellow-400 rounded w-full max-w-md md:max-w-xs">
                    회원가입
                </button>
            </div>

            <Landing3D />
        </div>
    );
};

export default Landing;
