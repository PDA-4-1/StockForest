export default function RankComponent(props) {
    const { nickname, user_pdi, img, ranking } = props.user;
    const rank = props.rank;
    const imgs = {
        1: "https://stockforest.s3.ap-northeast-2.amazonaws.com/profile_img/moli.png",
        2: "https://stockforest.s3.ap-northeast-2.amazonaws.com/profile_img/pli.png",
        3: "https://stockforest.s3.ap-northeast-2.amazonaws.com/profile_img/lululala.png",
        4: "https://stockforest.s3.ap-northeast-2.amazonaws.com/profile_img/sol.png",
    };

    return (
        <div className="flex items-center justify-between bg-white rounded-xl px-3 py-1 text-sm min-h-9">
            <p className="text-center min-w-6">{ranking || rank}</p>
            <div className="flex items-center space-x-2">
                <img src={imgs[img]} className="w-6 h-6 rounded-full border border-black bg-white" />
                <p className="min-w-[100px]">{nickname}</p>
            </div>
            <p className="min-w-[57px] text-right">{user_pdi.toLocaleString()} 프디</p>
        </div>
    );
}
