import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/Navbar";
import { useEffect, useState } from "react";
import { GetRanking } from "../../lib/apis/stock";
import { GetUserProfile, PatchEnding } from "../../lib/apis/user";
import { useNavigate } from "react-router-dom";
import { saveUser } from "../../store/userSlice";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";

export default function Ending() {
    const returns = useSelector((state) => state.user.user.user_returns);
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
        GetRanking()
            .then((data) => {
                // console.log(data.amI);
                setMyInfo(data.amI[0]);
            })
            .catch((err) => console.log(err.response));
    }, []);
    return (
        <div className="bg-background-pattern bg-cover bg-center h-screen">
            <Navbar />
            <Confetti width={width} height={height} gravity={0.05} numberOfPieces={150} />
            <div className="w-full h-[calc(100%_-_69.6px)] flex justify-center items-center">
                <div className="w-[400px] min-h-[400px] h-fit bg-modal-yellow rounded-3xl grid p-6 justify-items-center gap-6">
                    <img src={imgs[myInfo.img]} className="w-40 h-40 rounded-full bg-white object-contain" />
                    <p>{myInfo.nickname}</p>
                    <p>{myInfo.ranking} 위</p>
                    <p>수익 : {returns} %</p>
                    <p>총프디 : {myInfo.user_pdi.toLocaleString()} 프디</p>
                    <button className="bg-button-yellow px-3 py-2 rounded-xl hover:brightness-75" onClick={restart}>
                        다시하기
                    </button>
                </div>
            </div>
        </div>
    );
}
