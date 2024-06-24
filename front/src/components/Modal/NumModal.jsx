// import { useSelector } from "react-redux";
import num1 from "~/public/imgs/num/1.png";
import num2 from "~/public/imgs/num/2.png";
import num3 from "~/public/imgs/num/3.png";
import num4 from "~/public/imgs/num/4.png";
import num5 from "~/public/imgs/num/5.png";
import num6 from "~/public/imgs/num/6.png";
import num7 from "~/public/imgs/num/7.png";
import num8 from "~/public/imgs/num/8.png";
import num9 from "~/public/imgs/num/9.png";
import num0 from "~/public/imgs/num/0.png";
import "animate.css";
import { useEffect } from "react";
import { useState } from "react";

export default function NumModal(props) {
    const turn = props.turn;
    // const turn = useSelector((state) => state.user.user.turn);
    const units = turn % 10;
    const tens = turn >= 10 && (turn / 10) % 10;
    const hundreds = turn >= 100 && (turn / 100) % 10;
    const imgs = {
        num0,
        num1,
        num2,
        num3,
        num4,
        num5,
        num6,
        num7,
        num8,
        num9,
    };
    const common = "w-40";
    const [animation, setAnimation] = useState("animate__lightSpeedInRight");

    useEffect(() => {
        const handleAnimationEnd = () => {
            if (animation === "animate__lightSpeedInRight") {
                setAnimation("animate__fadeOutLeftBig");
            }
        };

        const element = document.querySelector(".animated-element");
        element.addEventListener("animationend", handleAnimationEnd);

        return () => {
            element.removeEventListener("animationend", handleAnimationEnd);
        };
    }, [animation]);

    return (
        <div className="z-10 bg-black/30 w-screen h-screen fixed left-0 top-0 flex justify-center items-center">
            <div
                className={`w-fit bg-transparent p-12 flex flex-col items-center animate__animated ${animation} animated-element`}
            >
                <div className="flex">
                    {hundreds >= 0 && <img className={common} src={imgs[`num${hundreds}`]} />}
                    {tens >= 0 && <img className={common} src={imgs[`num${tens}`]} />}
                    <img className="w-40" src={imgs[`num${units}`]} />
                </div>
            </div>
        </div>
    );
}
