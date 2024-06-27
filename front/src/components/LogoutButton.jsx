import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Toast } from "./Toast";
import { IoLogOutOutline } from "react-icons/io5";

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await axios.get("api/users/logout");
            if (response.status === 200) {
                Toast.fire("로그아웃 되었습니다!", "", "success");
                navigate("/login");
            }
        } catch (error) {
            console.error("Logout failed:", error);
            alert("로그아웃 실패: " + error.message);
        }
    };

    return (
        <IoLogOutOutline
            className="text-black-500 cursor-pointer w-6 h-6 "
            onClick={handleLogout}
        />
    );
};

export default LogoutButton;
