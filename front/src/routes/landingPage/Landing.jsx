import React from "react";
import Landing3D from "../../components/Landing3D";

const Landing = () => {
    return (
        <div className="main-page-wrapper">
            <h1>모여봐요 주식의 숲</h1>
            <div style={{display:"flex"}}>
            <button>로그인</button>
            <button>회원가입</button>
            </div>
            <Landing3D />            
        </div>
    );
};

export default Landing;
