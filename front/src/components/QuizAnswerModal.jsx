import moment from "moment-timezone";
import { FaLongArrowAltRight } from "react-icons/fa";

export default function QuizAnswerModal(props) {
    const {
        code,
        answerCheck,
        isCorrect,
        stockName,
        todayCost,
        yesterdayCost,
    } = props.result;
    const onHide = props.onHide;
    const date = moment().tz("Asia/Seoul").subtract(1, "days").format("YYYY-MM-DD");
    const handleModalClick = (e) => {
        if (e.target === e.currentTarget) {
            onHide();
        }
    };

    return (
        <div
            className="z-10 bg-black/30 w-screen h-screen fixed left-0 top-0 flex justify-center items-center"
            onClick={handleModalClick}
        >
            <div className="w-[400px] min-h-[400px] h-fit bg-modal-yellow rounded-3xl grid justify-items-center p-6">
                <p className="text-2xl font-bold">{date} 퀴즈</p>
                {code == 3 ? (
                    <p>어제 응답한 퀴즈가 없습니다</p>
                ) : (
                    <div className="text-center grid gap-6 w-full">
                        <p className="text-2xl font-bold">{stockName}</p>

                        <div className="flex justify-evenly">
                            <p>{yesterdayCost}</p>
                            <FaLongArrowAltRight />
                            <p>{todayCost}</p>
                        </div>

                        <div className="w-80 justify-self-center flex justify-evenly">
                            <div className="basis-1/3 flex justify-end">
                                <p>예상</p>
                            </div>
                            <div className="basis-1/3 flex justify-center">
                                <p>:</p>
                            </div>
                            <div className="basis-1/3 flex justify-start">
                                {answerCheck === 1 ? (
                                    <p>오른다 !</p>
                                ) : (
                                    <p>떨어진다 !</p>
                                )}
                            </div>
                        </div>
                        {isCorrect === 1 ? (
                            <div>
                                <p>맞았습니다 !!</p>
                                {code === 1 ? (
                                    <p>보상으로 500 프디를 받았어요 !!</p>
                                ) : (
                                    <div />
                                )}
                            </div>
                        ) : (
                            <div>
                                <p>틀렸습니다 ㅜㅜ</p>
                                <p>다음 퀴즈는 맞혀보아요 !!</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
