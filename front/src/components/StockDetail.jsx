import { useEffect } from "react";
import StockButton from "./StockButton";
import { IoTriangleSharp } from "react-icons/io5";
import { GetStockChart } from "../lib/apis/stock";

export default function StockDetail({ stock }) {
    const { id, name, price, diff } = stock;

    useEffect(() => {
        GetStockChart(id, 2).then((data) => console.log(data));
    }, []);

    return (
        <div className="bg-white w-full h-full col-span-3 px-6 py-9 flex flex-col justify-between">
            <div className="flex justify-between items-center">
                <span>{name}</span>
                <span className={diff > 0 ? "text-shinhan-red" : "text-shinhan-blue"}>{price.toLocaleString()}</span>
                <div className={`flex items-center ml-2 ${diff > 0 ? "text-shinhan-red" : "text-shinhan-blue"}`}>
                    <IoTriangleSharp className={diff <= 0 && "rotate-180"} />
                    <span className="min-w-[34px] text-right">{Math.abs(diff).toLocaleString()}</span>
                </div>
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
