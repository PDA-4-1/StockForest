import { useEffect, useState } from "react";
import StockButton from "./StockButton";
import { IoTriangleSharp } from "react-icons/io5";
import { GetStockChart, GetStockCount } from "../lib/apis/stock";
import StockChart from "./StockChart";
import OrderModal from "./Stock/OrderModal";
import { Toast } from "./Toast";
import { useSelector } from "react-redux";

export default function StockDetail({ stock }) {
    const { id, name, price, diff } = stock;
    const [purpo, setPurpo] = useState("");
    const [modalSee, setModalSee] = useState(false);
    const [count, setCount] = useState(0);
    const turn = useSelector((state) => state.user.user.turn);
    const openSellModal = () => {
        setPurpo("sell");
        GetStockCount(id, turn).then((data) => {
            console.log(data);
            if (data.length > 0) {
                setCount(data[0].quantity);
                setModalSee(true);
            } else {
                Toast.fire("보유 주식이 없어요!", "", "error");
            }
        });
    };
    const openBuyModal = () => {
        setPurpo("buy");
        setModalSee(true);
    };
    const onHide = () => {
        setModalSee(false);
    };

    return (
        <>
            <div className="bg-white w-full h-full col-span-3 px-6 py-9 flex flex-col space-y-3">
                <div className="flex justify-between items-center">
                    <span>{name}</span>
                    <span className={diff > 0 ? "text-shinhan-red" : "text-shinhan-blue"}>
                        {price.toLocaleString()}
                    </span>
                    <div className={`flex items-center ml-2 ${diff > 0 ? "text-shinhan-red" : "text-shinhan-blue"}`}>
                        <IoTriangleSharp className={diff <= 0 && "rotate-180"} />
                        <span className="min-w-[34px] text-right">{Math.abs(diff).toLocaleString()}</span>
                    </div>
                    <div className="flex space-x-6">
                        <StockButton purpo="buy" onClick={openBuyModal} />
                        <StockButton purpo="sell" onClick={openSellModal} />
                    </div>
                </div>
                <div className="flex">
                    <div className="w-20 h-20 bg-black rounded-full"></div>
                    <p>여기 회사 설명할거임</p>
                </div>
                <div className="max-h-[300px]">
                    <StockChart />
                </div>
            </div>
            {modalSee ? <OrderModal purpo={purpo} onHide={onHide} price={price} stockId={id} count={count} /> : null}
        </>
    );
}
