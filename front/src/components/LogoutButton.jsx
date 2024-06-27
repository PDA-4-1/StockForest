import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Toast } from "./Toast";
import { IoLogOutOutline } from "react-icons/io5";

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        const result = await Swal.fire({
            title: '로그아웃하시겠습니까?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: '로그아웃',
            cancelButtonText: '취소'
        });

        if (result.isConfirmed) {
            try {
                const response = await axios.get("api/users/logout");
                if (response.status === 200) {
                    Toast.fire({
                        icon: "success",
                        title: "로그아웃 되었습니다!"
                    });
                    navigate("/login");
                }
            } catch (error) {
                console.error("Logout failed:", error);
                alert("로그아웃 실패: " + error.message);
            }
        }
    };

    return (
        <IoLogOutOutline
            className="text-black-500 cursor-pointer w-6 h-6"
            onClick={handleLogout}
        />
    );
};

export default LogoutButton;
