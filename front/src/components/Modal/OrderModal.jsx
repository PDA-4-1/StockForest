import { useState } from "react";
import { BuyStock, SellStock } from "../../lib/apis/stock";
import StockButton from "../StockButton";
import { Toast } from "../Toast";
import { useDispatch, useSelector } from "react-redux";
import { savePdi } from "../../store/userSlice";

export default function OrderModal(props) {
    const user_pdi = useSelector((state) => state.user.user.user_pdi);
    const purpo = props.purpo;
    const onHide = props.onHide;
    const stockId = props.stockId;
    const price = props.price;
    const count = props.count;
    const avgPrice = props.avgPrice;
    const dispatch = useDispatch();
    const [num, setNum] = useState(0);
    const handleModalClick = (e) => {
        if (e.target === e.currentTarget) {
            onHide();
        }
    };
    const sellStock = () => {
        // console.log(num, stockId, price, price * num);
        if (!num) {
            Toast.fire("팔 과일을 1개 이상 골라주세요", "", "error");
            return;
        }
        SellStock(stockId, price, num)
            .then((data) => {
                // console.log(data);
                Toast.fire("과일을 판매했습니다", "", "success");
                dispatch(savePdi(price * num));
                onHide();
            })
            .catch((err) => {
                console.log(err.response);
                Toast.fire(err.response.data, "", "error");
                setNum(0);
            });
    };
    const buyStock = () => {
        // console.log(num, stockId, price, price * num);
        if (!num) {
            Toast.fire("살 과일을 1개 이상 골라주세요", "", "error");
            return;
        }
        BuyStock(stockId, price, num)
            .then((data) => {
                console.log(data);
                Toast.fire("과일을 구매했습니다", "", "success");
                dispatch(savePdi(-(price * num)));
                onHide();
            })
            .catch((err) => {
                console.log(err.response);
                Toast.fire(err.response.data, "", "error");
                setNum(0);
            });
        setNum(0);
    };
    const buyMax = () => {
        setNum(Math.trunc(user_pdi / price));
    };

    return (
        <div
            className="z-10 bg-black/30 w-screen h-screen fixed left-0 top-0 flex justify-center items-center"
            onClick={handleModalClick}
        >
            <div className="w-[400px] min-h-[400px] h-fit bg-modal-yellow rounded-3xl grid justify-items-center p-6">
                {purpo == "sell" ? (
                    <div className="text-center grid gap-6 w-full">
                        <p className="text-2xl font-bold">판 매 서</p>
                        <div className="flex justify-between items-center">
                            <p>내 과일</p>
                            <p>{count} 개</p>
                        </div>
                        <div className="flex justify-between items-center">
                            <p>팔 과일</p>
                            <div className="flex space-x-1 items-center">
                                <input
                                    type="number"
                                    min="0"
                                    value={num}
                                    onChange={(e) => setNum(e.target.value)}
                                    className="w-40 max-h-6 text-right"
                                />
                                <p>개</p>
                                <button
                                    onClick={() => setNum(count)}
                                    className="bg-shinhan-blue text-white text-xs px-2 py-1 rounded-full ml-3 h-fit"
                                >
                                    MAX
                                </button>
                            </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <p>원래 가격</p>
                            <p>{avgPrice} 프디</p>
                        </div>
                        <div className="flex justify-between items-center">
                            <p>현재 가격</p>
                            <p>{price} 프디</p>
                        </div>
                        <div className="flex justify-between items-center">
                            <p>총 가격</p>
                            <p>{price * num} 프디</p>
                        </div>
                        <div className="flex justify-center space-x-6">
                            <StockButton purpo={"cancle"} onClick={onHide} />
                            <StockButton purpo={purpo} onClick={sellStock} />
                        </div>
                    </div>
                ) : (
                    <div className="text-center grid gap-6 w-full">
                        <p className="text-2xl font-bold">주 문 서</p>
                        <div className="flex justify-between items-center">
                            <p>살 과일</p>
                            <div className="flex space-x-1 items-center">
                                <input
                                    type="number"
                                    min="0"
                                    value={num}
                                    onChange={(e) => setNum(e.target.value)}
                                    className="w-40 max-h-6 text-right"
                                />
                                <p>개</p>
                                <button
                                    onClick={buyMax}
                                    className="bg-shinhan-red text-white text-xs px-2 py-1 rounded-full ml-3 h-fit"
                                >
                                    MAX
                                </button>
                            </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <p>가격</p>
                            <p>{price} 프디</p>
                        </div>
                        <div className="flex justify-between items-center">
                            <p>총 가격</p>
                            <p>{price * num} 프디</p>
                        </div>
                        <div className="flex justify-center space-x-6">
                            <StockButton purpo={"cancle"} onClick={onHide} />
                            <StockButton purpo={purpo} onClick={buyStock} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
