import RankComponent from "./RankComponent";

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
        <div className="row-span-2 bg-back-yellow px-2">
            <p className="text-xl text-center">랭 킹</p>
            <div className="flex flex-col space-y-1">
                {users.map((el, i) => (
                    <RankComponent user={el} rank={i + 1} key={i} />
                ))}
                <RankComponent user={my} rank={136} />
            </div>
        </div>
    );
}
