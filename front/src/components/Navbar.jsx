import { useNavigate } from "react-router-dom";
import BgmBtn from "./BgmBtn";
import StockHistoryButton from "./StockHistoryButton";
import { FaQuestion } from "react-icons/fa";
import LogoutButton from "./LogoutButton";

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogoClick = () => {
        navigate("/market");
    };

    const handleMarketClick = () => {
        navigate("/market");
    };

    const handleFarmClick = () => {
        navigate("/farm");
    };

    const handleQuizClick = () => {
        navigate("/quiz");
    };

    const handleTutoClick = () => {
        navigate("/tutorial");
    };

    return (
        <>
            <div className="flex items-center justify-between">
                <div className="flex-shrink-0 ml-10">
                    <img
                        src="/imgs/Logo.svg"
                        alt="로고"
                        onClick={handleLogoClick}
                        className="w-[90px] h-[60px] cursor-pointer"
                    />
                </div>
                <div className="flex-grow flex justify-center space-x-4 gap-20 ml-[13vw]">
                    <div className="flex">
                        <img
                            src="/imgs/market.svg"
                            alt="마켓"
                            onClick={handleMarketClick}
                            className="size-10 cursor-pointer"
                        />
                        <button
                            onClick={handleMarketClick}
                            className="text-xl ml-2 text-[#505050]"
                        >
                            시장으로
                        </button>
                    </div>
                    <div className="flex">
                        <img
                            src="/imgs/farm.svg"
                            alt="농장"
                            onClick={handleFarmClick}
                            className="size-10 cursor-pointer"
                        />
                        <button
                            onClick={handleFarmClick}
                            className="text-xl ml-2 text-[#505050]"
                        >
                            농장으로
                        </button>
                    </div>
                </div>
                <div>
                    <StockHistoryButton />
                </div>
                <div className="flex mr-4 bg-yellow-300 px-3 py-1 border-black rounded-[20px] cursor-pointer">
                    <img
                        src="/imgs/quiz.svg"
                        alt="퀴즈"
                        className="size-10 cursor-pointer"
                    />
                    <button
                        onClick={handleQuizClick}
                        className="text-xl ml-2 text-[#505050]"
                    >
                        오늘의 퀴즈
                    </button>
                </div>
                <div className="bg-white rounded-full w-fit h-fit p-2 cursor-pointer mr-4">
                    <LogoutButton />
                </div>
                <div className="bg-white rounded-full w-fit h-fit p-2 cursor-pointer mr-4">
                    <BgmBtn />
                </div>
                <div
                    className="bg-white rounded-full w-fit h-fit p-2 cursor-pointer mr-4"
                    onClick={handleTutoClick}
                >
                    <FaQuestion className="w-6 h-6" />
                </div>
            </div>
            <div className="border-b-2 border-[#008000] mt-2"></div>
        </>
    );
};
export default Navbar;
