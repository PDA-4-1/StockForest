import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import StockCard from "../../components/StockCard";
import StockDetail from "../../components/StockDetail";
import Ranking from "../../components/Ranking/Ranking";
import { GetStockChart, GetStockList } from "../../lib/apis/stock";
import { useDispatch } from "react-redux";
import { savePrices } from "../../store/stockSlice";
import Profile from "../../components/Profile";

const Market = () => {
    const [stockList, setStockList] = useState([]);
    const [selected, setSelected] = useState(null);
    const dispatch = useDispatch();
    const saveStock = (el) => {
        setSelected(el);
        GetStockChart(el.id, 1)
            .then((data) => {
                const prices = data.map((el) => el.price);
                // console.log(prices);
                dispatch(savePrices(prices));
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        GetStockList(1)
            .then((data) => setStockList(data))
            .catch((err) => console.log(err.response));
    }, []);

    return (
        <div className="bg-background-pattern bg-cover bg-center h-screen">
            <Navbar />
            <div className="grid grid-cols-4 w-full h-[calc(100%_-_69.6px)] gap-6 p-6">
                <div className="bg-back-yellow col-span-3 h-full grid grid-cols-4 p-6 gap-6">
                    <div className="col-span-1 grid grid-rows-9 gap-1">
                        {stockList.map((el, i) => (
                            <StockCard
                                stock={el}
                                key={i}
                                selected={selected?.name}
                                onClick={() => {
                                    saveStock(el);
                                }}
                            />
                        ))}
                    </div>
                    {selected && <StockDetail stock={selected} />}
                </div>
                <div className="grid grid-rows-5 h-full">
                    <Profile />
                    <Ranking />
                </div>
            </div>
        </div>
    );
};
export default Market;
