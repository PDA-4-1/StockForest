import Navbar from "../../components/Navbar";
import { FaChevronDown } from "react-icons/fa";
import { FaChevronUp } from "react-icons/fa";

const Quiz = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    

    // open API를 이용해서 퀴즈에 쓸 투자전략 불러오기 -> 앞으로 1주일 간 꾸준히 불러보고 판단
    /* 사용자 응답 받아서 post 요청하기
        stockId, date, upDown state 생성하기
        - stockId는 드롭다운 선택 시 onClick 이벤트로 설정
        - date는 랜더링 시에 useEffect로 변경
        - upDown은 상승, 하락 버튼 클릭 onClick 이벤트로 설정
        - axios로 api 요청 전송
        - 응답 확인하기
    */

    return (
        <div className="bg-background-pattern bg-cover bg-center h-screen">
            <Navbar />
            <div className="flex flex-row">
                <div className="basis-1/2">
                    <button
                        type="button"
                        className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={toggleDropdown}
                    >
                        주식 이름
                        {isOpen ? <FaChevronDown /> : <FaChevronUp />}
                    </button>
                </div>

                {isOpen && (
                    <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                        <div
                            className="py-1"
                            role="menu"
                            aria-orientation="vertical"
                            aria-labelledby="options-menu"
                        >
                            <a
                                href="#"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                role="menuitem"
                            >
                                콩순전자
                            </a>
                            <a
                                href="#"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                role="menuitem"
                            >
                                초콜릿통신
                            </a>
                            <a
                                href="#"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                role="menuitem"
                            >
                                뉴진수퍼노바
                            </a>
                            <a
                                href="#"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                role="menuitem"
                            >
                                주식회사붕붕
                            </a>
                            <a
                                href="#"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                role="menuitem"
                            >
                                미미네약국
                            </a>
                            <a
                                href="#"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                role="menuitem"
                            >
                                철수건설
                            </a>
                            <a
                                href="#"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                role="menuitem"
                            >
                                올리브업
                            </a>
                            <a
                                href="#"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                role="menuitem"
                            >
                                숲속여관
                            </a>
                            <a
                                href="#"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                role="menuitem"
                            >
                                과학나라
                            </a>
                        </div>
                    </div>
                )}
                <div className="flex basis-1/2 items-center">
                    <div className="flex basis-1/2 justify-center">
                        <div className="basis-1/2 text-center">상승버튼</div>
                        <div className="basis-1/2 text-center">하락버튼</div>
                    </div>
                    <div className="basis-1/2 text-center">저장</div>
                </div>
            </div>
        </div>
    );
};

export default Quiz;
