import RankComponent from "./RankComponent";
import trophy from "~/public/imgs/trophy.png";

export default function Ranking() {
    const users = [
        {
            nickname: "닉네임은여덟글자",
            stock_returns: 25.88,
            profile_img: "",
        },
        {
            nickname: "닉네임은여덟글자",
            stock_returns: 23,
            profile_img: "",
        },
        {
            nickname: "닉네임은여덟글자",
            stock_returns: 20.3,
            profile_img: "",
        },
        {
            nickname: "닉네임은여덟글자",
            stock_returns: 23,
            profile_img: "",
        },
        {
            nickname: "닉네임은여덟글자",
            stock_returns: 23,
            profile_img: "",
        },
    ];
    const my = {
        nickname: "닉네임은여덟글자",
        stock_returns: 23,
        profile_img: "",
    };

    return (
        <div className="row-span-2 bg-back-yellow px-2 py-3 grid content-between">
            <div>
                <div className="flex items-center justify-center space-x-3 mb-4">
                    <img src={trophy} alt="트로피" className="w-9 h-9" />
                    <p className="text-2xl text-center">랭 킹</p>
                </div>
                <div className="flex flex-col space-y-2">
                    {users.map((el, i) => (
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