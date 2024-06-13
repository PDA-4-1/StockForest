export default function RankComponent(props) {
    const { nickname, stock_returns, profile_img } = props.user;
    const rank = props.rank;

    return (
        <div className="flex items-center justify-between bg-white rounded-xl px-3 py-1 text-sm min-h-9">
            <p className="text-center min-w-6">{rank}</p>
            <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded-full bg-black"></div>
                <p>{nickname}</p>
            </div>
            <p className="min-w-[57px] text-right">{stock_returns} %</p>
        </div>
    );
}
