import { useState } from "react";
import { BuyStock, SellStock } from "../../lib/apis/stock";
import StockButton from "../StockButton";

export default function OrderModal(props) {
    const purpo = props.purpo;
    const onHide = props.onHide;
    const stockId = props.stockId;
    const price = props.price;
    const [num, setNum] = useState(0);
    const handleModalClick = (e) => {
        if (e.target === e.currentTarget) {
            onHide();
        }
    };
    const sellStock = () => {
        console.log(num, stockId, price, price * num);
        SellStock(stockId, price, num)
            .then((data) => {
                console.log(data);
                onHide();
            })
            .catch((err) => console.log(err.response));
    };
    const buyStock = () => {
        console.log(num, stockId, price, price * num);
        BuyStock(stockId, price, num)
            .then((data) => {
                console.log(data);
                onHide();
            })
            .catch((err) => console.log(err.response));
        setNum(0);
    };

    return (
        <div
            className="z-10 bg-black/30 w-screen h-screen fixed left-0 top-0 flex justify-center items-center"
            onClick={handleModalClick}
        >
            <div className="w-[400px] h-fit bg-modal-yellow rounded-3xl grid justify-items-center p-6">
                {purpo == "sell" ? (
                    <div className="text-center grid gap-6 w-full">
                        <p className="text-2xl">판 매 서</p>
                        <div className="flex justify-between">
                            <p>내 나무</p>
                            <p>?? 그루</p>
                        </div>
                        <div className="flex justify-between">
                            <p>팔 나무</p>
                            <div className="flex space-x-1">
                                <input type="number" onChange={(e) => setNum(e.target.value)} className="w-40" />
                                <p>그루</p>
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <p>가격</p>
                            <p>{price} 원</p>
                        </div>
                        <div className="flex justify-between">
                            <p>총 가격</p>
                            <p>{price * num} 원</p>
                        </div>
                        <StockButton purpo={purpo} onClick={sellStock} />
                    </div>
                ) : (
                    <div className="text-center grid gap-6 w-full">
                        <p className="text-2xl">주 문 서</p>
                        <div className="flex justify-between">
                            <p>살 나무</p>
                            <div className="flex space-x-1">
                                <input type="number" onChange={(e) => setNum(e.target.value)} className="w-40" />
                                <p>그루</p>
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <p>가격</p>
                            <p>{price} 원</p>
                        </div>
                        <div className="flex justify-between">
                            <p>총 가격</p>
                            <p>{price * num} 원</p>
                        </div>
                        <StockButton purpo={purpo} onClick={buyStock} />
                    </div>
                )}
            </div>
        </div>
    );
}
