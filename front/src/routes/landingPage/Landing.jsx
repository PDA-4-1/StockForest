import React, { useState } from "react";
import Landing3D from "../../components/Landing3D";
import { useNavigate } from "react-router-dom";

const Landing = () => {
    const [hoveredButton, setHoveredButton] = useState(null);
    const navigate = useNavigate();

    return (
        <div className="bg-background-pattern flex flex-col bg-cover bg-center h-screen relative">
            <div className="flex justify-center pt-5 scale-100">
                <img
                    src="/imgs/loginlogo.svg"
                    alt="로그인로고"
                    className="max-400:w-[300px]"
                />
            </div>
            <div className="flex space-x-40 justify-center mb-40 relative top-10">
                <div className="relative">
                    {hoveredButton === "login" && (
                        <img
                            src="/imgs/finger.svg"
                            alt="선택 손가락"
                            className="absolute left-[-50px] w-[50px] h-[50px] top-6"
                        />
                    )}
                    <button
                        className="mt-6 p-2 bg-yellow-400 rounded w-[180px] max-w-md md:max-w-xs text-[22px]"
                        onMouseEnter={() => setHoveredButton("login")}
                        onMouseLeave={() => setHoveredButton(null)}
                        onClick={() => navigate("/login")}
                    >
                        로그인
                    </button>
                </div>

                <div className="relative">
                    {hoveredButton === "signUp" && (
                        <img
                            src="/imgs/finger.svg"
                            alt="선택 손가락"
                            className="absolute left-[-50px] w-[50px] h-[50px] top-6"
                        />
                    )}
                    <button
                        className="mt-6 p-2 bg-yellow-400 rounded w-[180px] max-w-md md:max-w-xs text-[22px]"
                        onMouseEnter={() => setHoveredButton("signUp")}
                        onMouseLeave={() => setHoveredButton(null)}
                        onClick={() => navigate("/signup")}
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
