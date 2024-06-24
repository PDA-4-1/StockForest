import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Toast } from "../../components/Toast";

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
                Toast.fire("회원가입 성공!", "", "success");
                navigate("/login");
            }
        } catch (error) {
            if (error.response) {
                Toast.fire(error.response.data.message, "", "error");
            } else {
                Toast.fire("회원가입 중 오류가 발생했습니다!", "", "error");
            }
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
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
                                <h1 className="text-[3vw] text-[#505050] mb-10">
                                    회원가입
                                </h1>
                            </div>
                            <div className="flex flex-col items-center justify-center row-span-1">
                                <input
                                    type="text"
                                    placeholder="닉네임"
                                    className="p-2 border border-gray-300 rounded w-full "
                                    {...register("nickname", {
                                        required: "닉네임을 입력해주세요.",
                                        maxLength: {
                                            value: 20,
                                            message:
                                                "닉네임은 20자 이내여야 합니다.",
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
                                    className="p-2 border border-gray-300 rounded w-full mt-2"
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
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="mt-6 p-2 bg-yellow-400 rounded w-[200px]"
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
