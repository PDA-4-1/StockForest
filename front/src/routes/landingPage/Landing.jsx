import React from "react";
import Landing3D from "../../components/Landing3D";

const Landing = () => {
    return (
        <div className="bg-background-pattern bg-cover bg-center h-screen">
            <div className="flex justify-center pt-5 scale-75">
                <img
                    src="/imgs/loginlogo.svg"
                    alt="로그인로고"
                    className="max-400:w-[300px]"
                />{" "}
                <div
                    style={{
                        display: "flex",
                        gap: "20px",
                        marginBottom: "20px",
                    }}
                ></div>
            </div>

            <Landing3D />
        </div>
    );
};

export default Landing;
