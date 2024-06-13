import StockButton from "./StockButton";

export default function StockDetail(props) {
    const title = props.title;

    return (
        <div className="bg-white w-full h-full col-span-3 px-6 py-9 flex flex-col justify-between">
            <div className="flex justify-between items-center">
                <span>{title}</span>
                <span>가격</span>
                <span>여기 상승하락</span>
                <div className="flex space-x-6">
                    <StockButton purpo="buy" onClick={() => {}} />
                    <StockButton purpo="sell" onClick={() => {}} />
                </div>
            </div>
            <div className="flex">
                <div className="w-28 h-28 bg-black rounded-full"></div>
                <p>여기 회사 설명할거임</p>
            </div>
            <div className="h-[200px] bg-black text-white">여기 차트 자리</div>
            <div></div>
        </div>
    );
}
