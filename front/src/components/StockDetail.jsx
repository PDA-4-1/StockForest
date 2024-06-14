import { useEffect, useState } from "react";
import StockButton from "./StockButton";
import { IoTriangleSharp } from "react-icons/io5";
import { GetStockChart } from "../lib/apis/stock";
import StockChart from "./StockChart";

export default function StockDetail({ stock }) {
    const { id, name, price, diff } = stock;
    // const [prices, setPrices] = useState(null);

    // useEffect(() => {
    //     GetStockChart(id, 1).then((data) => {
    //         const priceList = data.map((el) => el.price);
    //         setPrices(priceList);
    //     });
    // }, []);

    return (
        <div className="bg-white w-full h-full col-span-3 px-6 py-9 flex flex-col space-y-3">
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
                <div className="w-20 h-20 bg-black rounded-full"></div>
                <p>여기 회사 설명할거임</p>
            </div>
            <div>
                <StockChart />
            </div>
            <div></div>
        </div>
    );
}
