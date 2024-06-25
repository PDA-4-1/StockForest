import { useSelector, useDispatch } from "react-redux";
import { setBgm } from "../store/stockSlice";
import { MdMusicNote, MdMusicOff } from "react-icons/md";

const BgmBtn = () => {
    const bgmStatus = useSelector((state) => state.stock.bgmOn);
    const dispatch = useDispatch();
    console.log(`음악 실행 여부: ${bgmStatus}`);
    return (
        <div>
            {bgmStatus && (
                <MdMusicNote
                    className="text-black-500 text-5xl cursor-pointer"
                    onClick={() => {
                        dispatch(setBgm());
                    }}
                />
            )}
            {!bgmStatus && (
                <MdMusicOff
                    className="text-red-500 text-5xl cursor-pointer"
                    onClick={() => {
                        dispatch(setBgm());
                    }}
                />
            )}
        </div>
    );
};
export default BgmBtn;
