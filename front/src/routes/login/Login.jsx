import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Toast } from "../../components/Toast";

const Login = () => {
    const [nickname, setNickname] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSignup = () => {
        navigate("/signup");
    };

    const handleEnter = async (e) => {
        if (e.key === "Enter") {
            try {
                const response = await axios.post("api/users/signin", {
                    nickname,
                    password,
                });

                if (response.status === 200) {
                    navigate("/market");
                }
            } catch (error) {
                if (error.response) {
                    Toast.fire(error.response.data.message, "", "error");
                } else {
                    Toast.fire("로그인 중 오류가 발생했습니다!", "", "error");
                }
            }
        }
    };

    const handleLogin = async () => {
        try {
            const response = await axios.post("api/users/signin", {
                nickname,
                password,
            });

            if (response.status === 200) {
                navigate("/market");
            }
        } catch (error) {
            if (error.response) {
                Toast.fire(error.response.data.message, "", "error");
            } else {
                Toast.fire("로그인 중 오류가 발생했습니다!", "", "error");
            }
        }
    };

    return (
        <div className="relative bg-background-pattern bg-cover bg-center h-screen grid grid-rows-6">
            <div className="flex justify-center pt-5 scale-75 row-span-2">
                <img
                    src="/imgs/loginlogo.svg"
                    alt="로그인로고"
                    className="max-400:w-[300px]"
                />
            </div>
            <div className="flex justify-center bg-[url('/imgs/loginform.svg')] bg-no-repeat bg-center bg-contain row-span-3">
                <div className="flex flex-col items-center justify-center p-4 w-full">
                    <div className="grid grid-rows-2">
                        <div className="flex items-center justify-center row-span-1">
                            <h3 className="text-[3vw] text-[#505050] mb-10">
                                로그인
                            </h3>
                        </div>
                        <div className="flex flex-col items-center justify-center row-span-1">
                            <input
                                type="text"
                                placeholder="닉네임"
                                className="p-2 border border-gray-300 rounded w-full "
                                value={nickname}
                                onChange={(e) => setNickname(e.target.value)}
                                onKeyDown={handleEnter}
                            />
                            <input
                                type="password"
                                placeholder="비밀번호"
                                className="p-2 border border-gray-300 rounded w-full mt-2"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onKeyDown={handleEnter}
                            />
                        </div>
                        <div className="flex w-full justify-between">
                            <div className="flex items-center justify-center ">
                                <button
                                    className="p-2 bg-yellow-400 rounded w-[100px]"
                                    onClick={handleLogin}
                                >
                                    로그인
                                </button>
                            </div>
                            <div className="flex items-center justify-center">
                                <button
                                    className="p-2 bg-yellow-400 rounded w-[100px]"
                                    onClick={handleSignup}
                                >
                                    회원가입
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
