import React from "react";
import Landing3D from "../../components/Landing3D";

const Landing = () => {
    return (

        <div className="bg-background-pattern bg-cover bg-center h-screen">
            <h1>모여봐요 주식의 숲</h1>
            <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
                <button>로그인</button>
                <button>회원가입</button>
            </div>
            <Landing3D />
        </div>
    );
};

export default Landing;
