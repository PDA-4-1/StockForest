import { useState } from "react";
import { PostTutorial } from "../../lib/apis/user";
import { useNavigate } from "react-router-dom";
import logo from "~/public/imgs/Logo.svg";
import heart from "~/public/imgs/heart.png";

export default function Tutorial() {
    const [step, setStep] = useState(0);
    const common = "bg-button-yellow px-4 py-2 rounded hover:brightness-75 h-fit";
    const navigate = useNavigate();

    // 튜토리얼 스킵
    const skipTutorial = () => {
        PostTutorial()
            .then((data) => {
                console.log(data);
                if (data.status === 200) {
                    navigate("/market");
                }
            })
            .catch((err) => console.log(err.response));
    };

    // 다음 단계
    const nextStep = () => {
        // 마지막 튜토리얼이면 tutorial 1로 바꾸고 마켓으로 이동
        if (step === 20) {
            PostTutorial()
                .then((data) => {
                    console.log(data);
                    if (data.status === 200) {
                        navigate("/market");
                    }
                })
                .catch((err) => console.log(err.response));
        }
        setStep(step + 1);
        console.log(step);
    };

    return (
        <div className="w-full h-screen max-h-screen bg-background-pattern relative grid justify-items-center">
            <img src={logo} alt="로고" className="max-w-[500px]" />
            <button className={`${common} animate__animated animate__heartBeat animate__infinite`}>
                튜토리얼 시작
            </button>
            <img src={heart} alt="하트" className="max-w-[300px]" />
            <button className={`${common} absolute bottom-6 left-6`} onClick={skipTutorial}>
                스킵하기
            </button>
            {step != 0 && (
                <button className={`${common} absolute`} onClick={nextStep}>
                    다음
                </button>
            )}
        </div>
    );
}
