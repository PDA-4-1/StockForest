import { useNavigate } from "react-router-dom";

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

    return (
        <>
            <div class="flex items-center justify-between">
                <div class="flex-shrink-0 ml-10">
                    <img
                        src="/imgs/Logo.svg"
                        alt="로고"
                        onClick={handleLogoClick}
                    />
                </div>
                <div class="flex-grow flex justify-center space-x-4 gap-20">
                    <div class="flex">
                        <img
                            src="/imgs/market.svg"
                            alt="마켓"
                            onClick={handleMarketClick}
                            class="size-10 cursor-pointer"
                        />
                        <button
                            onClick={handleMarketClick}
                            class="text-xl ml-2 text-[#505050]"
                        >
                            시장으로
                        </button>
                    </div>
                    <div class="flex">
                        <img
                            src="/imgs/farm.svg"
                            alt="농장"
                            onClick={handleFarmClick}
                            class="size-10 cursor-pointer"
                        />
                        <button
                            onClick={handleFarmClick}
                            class="text-xl ml-2 text-[#505050]"
                        >
                            농장으로
                        </button>
                    </div>
                </div>
                <div className="flex mr-10 bg-yellow-300 px-3 py-1 border-black rounded-[20px] cursor-pointer">
                    <img
                        src="/imgs/quiz.svg"
                        alt="퀴즈"
                        class="size-10 cursor-pointer"
                    />
                    <button class="text-xl ml-2 text-[#505050]">
                        오늘의 퀴즈
                    </button>
                </div>
            </div>
            <div class="border-b-2 border-[#FDF9EA] mt-2"></div>
        </>
    );
};
export default Navbar;
