import React, { useState } from "react";
import Landing3D from "../../components/Landing3D";

const Landing = () => {
    const [hoveredButton, setHoveredButton] = useState(null);

    return (
        <div className="bg-background-pattern flex flex-col bg-cover bg-center h-screen relative">
            <div className="flex justify-center pt-5 scale-90">
                <img
                    src="/imgs/loginlogo.svg"
                    alt="로그인로고"
                    className="max-400:w-[300px]"
                />
            </div>
            <div className="flex space-x-44 justify-center mb-40 relative">
                <div className="relative">
                    {hoveredButton === "login" && (
                        <img
                            src="/imgs/finger.svg"
                            alt="선택 손가락"
                            className="absolute left-[-50px] w-[40px] h-[40px] top-6"
                        />
                    )}
                    <button
                        className="mt-6 p-2 bg-yellow-400 rounded w-[200px] max-w-md md:max-w-xs"
                        onMouseEnter={() => setHoveredButton("login")}
                        onMouseLeave={() => setHoveredButton(null)}
                    >
                        로그인
                    </button>
                </div>

                <div className="relative">
                    {hoveredButton === "signUp" && (
                        <img
                            src="/imgs/finger.svg"
                            alt="선택 손가락"
                            className="absolute left-[-50px] w-[40px] h-[40px] top-6"
                        />
                    )}
                    <button
                        className="mt-6 p-2 bg-yellow-400 rounded w-[200px] max-w-md md:max-w-xs"
                        onMouseEnter={() => setHoveredButton("signUp")}
                        onMouseLeave={() => setHoveredButton(null)}
                    >
                        회원가입
                    </button>
                </div>
            </div>

            <Landing3D />
        </div>
    );
};

export default Landing;
