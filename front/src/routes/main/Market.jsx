import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import StockCard from "../../components/StockCard";
import StockDetail from "../../components/StockDetail";
import Ranking from "../../components/Ranking/Ranking";
import { GetStockList } from "../../lib/apis/stock";

const Market = () => {
    const [stockList, setStockList] = useState([]);
    const [selected, setSelected] = useState(null);

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
                                    setSelected(el);
                                }}
                            />
                        ))}
                    </div>
                    {selected && <StockDetail stock={selected} />}
                </div>
                <div className="grid grid-rows-3 h-full">
                    <div className="bg-back-yellow mb-4">여기 프로필 부분</div>
                    <Ranking />
                </div>
            </div>
        </div>
    );
};
export default Market;
