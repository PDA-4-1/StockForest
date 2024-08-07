import { useEffect, useState } from "react";
import RankComponent from "./RankComponent";
import trophy from "~/public/imgs/trophy.png";
import { GetRanking } from "../../lib/apis/stock";
import { useSelector } from "react-redux";

export default function Ranking() {
    const turn = useSelector((state) => state.user.user.turn);
    const [users, setUsers] = useState([]);
    const [my, setMy] = useState({
        nickname: "닉네임은여덟글자",
        user_pdi: 23,
        profile_img: "",
    });

    useEffect(() => {
        GetRanking()
            .then((data) => {
                console.log(data);
                if (data.top5[0]) {
                    setUsers(data?.top5);
                }
                if (data.amI[0]) {
                    setMy(data?.amI[0]);
                }
            })
            .catch((err) => console.log(err.response));
    }, [turn]);

    return (
        <div className="row-span-3 bg-back-yellow px-2 py-3 grid content-between rounded-3xl">
            <div>
                <div className="flex items-center justify-center space-x-3 mb-4">
                    <img src={trophy} alt="트로피" className="w-9 h-9" />
                    <p className="text-2xl text-center">랭 킹</p>
                </div>
                <div className="flex flex-col space-y-2">
                    {users?.map((el, i) => (
                        <RankComponent user={el} rank={i + 1} key={i} />
                    ))}
                </div>
            </div>
            <div className="">
                <RankComponent user={my} rank={136} />
            </div>
        </div>
    );
}
