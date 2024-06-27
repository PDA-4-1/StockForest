import { useEffect, useState } from "react";
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
        navigate("/market");
    };

    // 다음 단계
    const nextStep = () => {
        // 마지막 튜토리얼이면 마켓으로 이동
        if (step === 21) {
            navigate("/market");
        }
        setStep(step + 1);
        // console.log(step);
    };

    const generateImageUrls = (count) => {
        const urls = {};
        for (let i = 1; i <= count; i++) {
            urls[
                i
            ] = `https://stockforest.s3.ap-northeast-2.amazonaws.com/tutorial/%ED%8A%9C%ED%86%A0%EB%A6%AC%EC%96%BC${i}.png`;
        }
        return urls;
    };

    const imgs = generateImageUrls(21);

    useEffect(() => {
        PostTutorial().catch((err) => console.log(err.response));
    }, []);
    return (
        <div className="w-full h-screen max-h-screen bg-background-pattern relative grid justify-items-center">
            {step != 0 ? (
                <>
                    <button className={`${common} absolute right-6 top-6`} onClick={nextStep}>
                        {step === 20 ? "시작하기" : "다음으로"}
                    </button>
                    <img src={imgs[step]} className="max-h-screen w-full h-full object-fill" />
                </>
            ) : (
                <>
                    <img src={logo} alt="로고" className="max-w-[500px]" />
                    <button
                        className={`${common} animate__animated animate__heartBeat animate__infinite`}
                        onClick={() => setStep(1)}
                    >
                        튜토리얼 시작
                    </button>
                    <img src={heart} alt="하트" className="max-w-[300px]" />
                </>
            )}
            <button className={`${common} absolute top-6 left-6`} onClick={skipTutorial}>
                스킵하기
            </button>
        </div>
    );
}
