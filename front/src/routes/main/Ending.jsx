import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/Navbar";
import { useEffect, useState } from "react";
import { GetRanking } from "../../lib/apis/stock";
import { GetUserProfile, PatchEnding } from "../../lib/apis/user";
import { useNavigate } from "react-router-dom";
import { saveUser } from "../../store/userSlice";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
import CongratsModal from "../../components/Modal/CongratsModal";

export default function Ending() {
    const returns = useSelector((state) => state.user.user.user_returns);
    const turn = useSelector((state) => state.user.user.turn);
    const common = "flex justify-between w-full";
    const [congSee, setCongSee] = useState(false);
    const [myInfo, setMyInfo] = useState({
        img: "",
        nickname: "",
        ranking: 0,
        user_id: 0,
        user_pdi: 1,
    });
    const imgs = {
        1: "https://stockforest.s3.ap-northeast-2.amazonaws.com/profile_img/moli.png",
        2: "https://stockforest.s3.ap-northeast-2.amazonaws.com/profile_img/pli.png",
        3: "https://stockforest.s3.ap-northeast-2.amazonaws.com/profile_img/lululala.png",
        4: "https://stockforest.s3.ap-northeast-2.amazonaws.com/profile_img/sol.png",
    };

    // 새로 시작하기
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const restart = () => {
        PatchEnding()
            .then((data) => {
                console.log(data);
                if (data === "reset success") {
                    GetUserProfile().then((data) => {
                        console.log(data);
                        dispatch(saveUser(data));
                    });
                    navigate("/farm");
                }
            })
            .catch((err) => console.log(err));
    };

    // 폭죽 관련
    const { width, height } = useWindowSize();

    // 유저 랭킹 정보 불러오기
    useEffect(() => {
        if (turn < 156) {
            navigate("/market");
        }
        GetRanking()
            .then((data) => {
                // console.log(data.amI);
                setMyInfo(data.amI[0]);
            })
            .catch((err) => console.log(err.response));

        setCongSee(true);
        const timer = setTimeout(() => {
            setCongSee(false);
        }, 1200);

        return () => clearTimeout(timer);
    }, []);
    return (
        <div className="bg-background-pattern bg-cover bg-center h-screen">
            <Navbar />
            <Confetti width={width} height={height} gravity={0.05} numberOfPieces={150} />
            <div className="w-full h-[calc(100%_-_69.6px)] flex justify-center items-center">
                <div className="w-[400px] min-h-[400px] h-fit bg-modal-yellow rounded-3xl grid p-6 justify-items-center gap-6">
                    <img src={imgs[myInfo.img]} className="w-40 h-40 rounded-full bg-white object-contain" />
                    <p className="text-2xl font-bold">{myInfo.nickname}</p>
                    <div className="w-full grid gap-3">
                        <div className={common}>
                            <p>순위</p>
                            <p>{myInfo.ranking} 위</p>
                        </div>
                        <div className={common}>
                            <p>수익률</p>
                            <p>{returns}%</p>
                        </div>
                        <div className={common}>
                            <p>총 프디</p>
                            <p>{myInfo.user_pdi.toLocaleString()} 프디</p>
                        </div>
                    </div>
                    <button
                        className="bg-button-yellow px-6 py-4 rounded-xl hover:brightness-75 text-2xl font-bold"
                        onClick={restart}
                    >
                        다시하기
                    </button>
                </div>
            </div>
            {congSee && <CongratsModal />}
        </div>
    );
}
