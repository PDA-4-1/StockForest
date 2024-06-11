import React from "react";

const Login = () => {
    return (
        <div className="relative bg-background-pattern bg-cover bg-center h-screen">
            <div className="flex justify-center pt-5 scale-75">
                <img src="/imgs/loginlogo.svg" alt="로그인로고" className="max-400:w-[300px]"/>
            </div>
            <div className="flex justify-center scale-90 -mt-10 bg-[url('/imgs/loginform.svg')] bg-no-repeat bg-center bg-contain lg:h-[600px] max-lg:h-[500px]">
                <div className="flex flex-col items-center justify-center p-4">
                    <h1 className="text-[40px] text-[#505050] mb-10 max-570:text-[30px]">회원가입</h1>
                    <input
                        type="text"
                        placeholder="닉네임"
                        className="mb-4 p-2 border border-gray-300 rounded w-full max-w-md md:max-w-xs max-570:w-[150px]"
                    />
                    <input
                        type="password"
                        placeholder="비밀번호"
                        className="mb-4 p-2 border border-gray-300 rounded w-full max-w-md md:max-w-xs max-570:w-[150px]"
                    />
                    <button className="mt-6 p-2 bg-yellow-400 rounded w-full max-w-md md:max-w-xs">
                        회원가입
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
