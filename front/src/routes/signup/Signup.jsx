import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const Signup = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        const { nickname, password } = data;
        try {
            const response = await axios.post("/api/users/signup", {
                nickname,
                password,
            });

            if (response.status === 200) {
                alert("회원가입 성공");
                navigate("/login");
            }
        } catch (error) {
            if (error.response) {
                alert(error.response.data.message);
            } else {
                alert("회원가입 중 오류가 발생했습니다.");
            }
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="relative bg-background-pattern bg-cover bg-center h-screen">
                <div className="flex justify-center pt-5 scale-75">
                    <img
                        src="/imgs/loginlogo.svg"
                        alt="로그인로고"
                        className="max-400:w-[300px]"
                    />
                </div>
                <div className="flex justify-center scale-90 -mt-10 bg-[url('/imgs/loginform.svg')] bg-no-repeat bg-center bg-contain lg:h-[600px] max-lg:h-[500px]">
                    <div className="flex flex-col items-center justify-center p-4">
                        <h1 className="text-[40px] text-[#505050] mb-10 max-570:text-[30px]">
                            회원가입
                        </h1>
                        <input
                            type="text"
                            placeholder="닉네임"
                            className="mb-2 p-2 border border-gray-300 rounded w-full max-w-md md:max-w-xs max-570:w-[150px]"
                            {...register("nickname", {
                                required: "닉네임을 입력해주세요.",
                                maxLength: {
                                    value: 20,
                                    message: "닉네임은 20자 이내여야 합니다.",
                                },
                            })}
                        />
                        {errors.nickname && (
                            <p className="text-red-500">
                                {errors.nickname.message}
                            </p>
                        )}
                        <input
                            type="password"
                            placeholder="비밀번호"
                            className="mt-2 mb-2 p-2 border border-gray-300 rounded w-full max-w-md md:max-w-xs max-570:w-[150px]"
                            {...register("password", {
                                required: "비밀번호를 입력해주세요.",
                                minLength: {
                                    value: 3,
                                    message:
                                        "비밀번호는 최소 3자 이상이어야 합니다.",
                                },
                            })}
                        />
                        {errors.password && (
                            <p className="text-red-500">
                                {errors.password.message}
                            </p>
                        )}
                        <button
                            type="submit"
                            className="mt-6 p-2 bg-yellow-400 rounded w-full max-w-md md:max-w-xs"
                        >
                            회원가입
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default Signup;
