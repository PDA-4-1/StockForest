import { useEffect, useState } from "react";
import StockButton from "./StockButton";
import { IoTriangleSharp } from "react-icons/io5";
import { GetStockChart, GetStockCount } from "../lib/apis/stock";
import StockChart from "./StockChart";
import OrderModal from "./Modal/OrderModal";
import { Toast } from "./Toast";
import { useSelector } from "react-redux";

export default function StockDetail({ stock }) {
    const { id, name, price, diff, description } = stock;
    const [purpo, setPurpo] = useState("");
    const [modalSee, setModalSee] = useState(false);
    const [count, setCount] = useState(0);
    const [avgPrice, setAvgPrice] = useState(0);
    const turn = useSelector((state) => state.user.user.turn);
    const openSellModal = () => {
        setPurpo("sell");
        GetStockCount(id, turn).then((data) => {
            console.log(data);
            if (data.length > 0 && data[0].quantity > 0) {
                setCount(data[0].quantity);
                setAvgPrice(data[0].avg_price);
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
    const stockImages = {
        1: "https://stockforest.s3.ap-northeast-2.amazonaws.com/field/tomato/tomatoprofile.png",
        2: "https://stockforest.s3.ap-northeast-2.amazonaws.com/field/banana/bananaprofile.png",
        3: "https://stockforest.s3.ap-northeast-2.amazonaws.com/field/blueberry/blueberryprofile.png",
        4: "https://stockforest.s3.ap-northeast-2.amazonaws.com/field/peach/peachprofile.png",
        5: "https://stockforest.s3.ap-northeast-2.amazonaws.com/field/orange/orangeprofile.png",
        6: "https://stockforest.s3.ap-northeast-2.amazonaws.com/field/melon/melonprofile.png",
        7: "https://stockforest.s3.ap-northeast-2.amazonaws.com/field/grape/grapeprofile.png",
        8: "https://stockforest.s3.ap-northeast-2.amazonaws.com/field/apple/appleprofile.png",
        9: "https://stockforest.s3.ap-northeast-2.amazonaws.com/field/strawberry/strawberryprofile.png",
    };

    return (
        <>
            <div className="bg-white w-full h-full col-span-3 px-6 py-9 flex flex-col space-y-3 rounded-3xl">
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
                <div className="flex space-x-6">
                    <img
                        src={stockImages[id]}
                        className="min-w-24 w-24 h-24 bg-back-yellow rounded-full object-contain"
                    />
                    <p className="break-keep">{description}</p>
                </div>
                <div className="max-h-[300px]">
                    <StockChart />
                </div>
            </div>
            {modalSee ? (
                <OrderModal
                    purpo={purpo}
                    onHide={onHide}
                    price={price}
                    stockId={id}
                    count={count}
                    avgPrice={avgPrice}
                />
            ) : null}
        </>
    );
}
