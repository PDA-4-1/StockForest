import { useSelector } from "react-redux";

const BgmBtn = () => {
    const bgmStatus = useSelector((state) => state.user.bgmOn);

    return (
        <div>
            {bgmStatus &
            (
                <button
                    onClick={() => {
                        dispatch(setBgm());
                    }}
                >
                    BGM 끄기
                </button>
            )}
            {!bgmStatus &
            (
                <button
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
