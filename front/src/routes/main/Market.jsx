import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import StockCard from "../../components/StockCard";
import StockDetail from "../../components/StockDetail";
import Ranking from "../../components/Ranking/Ranking";
import { GetStockChart, GetStockList, NextTurn } from "../../lib/apis/stock";
import { useDispatch, useSelector } from "react-redux";
import { savePrices, saveStockList } from "../../store/stockSlice";
import Profile from "../../components/Profile";
import { GetUserProfile } from "../../lib/apis/user";
import { saveTurn, saveUser } from "../../store/userSlice";
import NewsModal from "../../components/Modal/NewsModal";
import NumModal from "../../components/Modal/NumModal";

const Market = () => {
    const stockList = useSelector((state) => state.stock.stockList);
    const [selected, setSelected] = useState(null);
    const turn = useSelector((state) => state.user.user.turn);
    const [modalSee, setModalSee] = useState(false);
    const [newsList, setNewsList] = useState([]);
    const [roundSee, setRoundSee] = useState(false);
    const [round, setRound] = useState(0);
    const dispatch = useDispatch();
    const saveStock = (el) => {
        setSelected(el);
        GetStockChart(el.id, turn)
            .then((data) => {
                const prices = data.map((el) => el.price);
                // console.log(prices);
                dispatch(savePrices(prices));
            })
            .catch((err) => console.log(err));
    };
    const nextTurn = () => {
        setRound(turn + 1);
        setRoundSee(true);
        NextTurn(turn)
            .then((data) => {
                console.log(data);
                setTimeout(() => {
                    setRoundSee(false);
                    if (data.news.length > 0) {
                        setRoundSee(false);
                        setModalSee(true);
                        setNewsList(data.news);
                    }
                }, 1000);
                GetStockList(turn + 1).then((data) => {
                    console.log(data);
                    dispatch(saveStockList(data));
                });
                dispatch(saveTurn());
                setSelected(null);
            })
            .catch((err) => console.log(err.response));
    };

    useEffect(() => {
        GetUserProfile()
            .then((data) => {
                console.log(data);
                dispatch(saveUser(data));
                GetStockList(data.turn)
                    .then((data) => {
                        console.log(data);
                        dispatch(saveStockList(data));
                    })
                    .catch((err) => console.log(err.response));
            })
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
                    <Profile nextTurn={nextTurn} />
                    <Ranking />
                </div>
            </div>
            {modalSee && <NewsModal onHide={() => setModalSee(false)} newsList={newsList} />}
            {roundSee && <NumModal turn={round} />}
        </div>
    );
};
export default Market;
