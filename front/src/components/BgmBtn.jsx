import { useSelector, useDispatch } from "react-redux";
import { setBgm } from "../store/stockSlice";

const BgmBtn = () => {
    const bgmStatus = useSelector((state) => state.stock.bgmOn);
    const dispatch = useDispatch();
    console.log(`음악 실행 여부: ${bgmStatus}`);
    return (
        <div>
            {bgmStatus && (
                <button
                    className="border-2 border-black rounded-lg bg-red-300"
                    onClick={() => {
                        dispatch(setBgm());
                    }}
                >
                    BGM 끄기
                </button>
            )}
            {!bgmStatus && (
                <button
                    className="border-2 border-black rounded-lg bg-red-300"
                    onClick={() => {
                        dispatch(setBgm());
                    }}
                >
                    BGM 켜기
                </button>
            )}
        </div>
    );
};
export default BgmBtn;
