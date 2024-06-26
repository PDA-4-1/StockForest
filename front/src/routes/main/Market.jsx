import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/Navbar";
import StockCard from "../../components/StockCard";
import StockDetail from "../../components/StockDetail";
import Ranking from "../../components/Ranking/Ranking";
import { GetStockChart, GetStockList, NextTurn } from "../../lib/apis/stock";
import { savePrices, saveStockList, saveSelectedStock } from "../../store/stockSlice";
import Profile from "../../components/Profile";
import { GetUserProfile } from "../../lib/apis/user";
import { saveTurn, saveUser } from "../../store/userSlice";
import NewsModal from "../../components/Modal/NewsModal";
import NumModal from "../../components/Modal/NumModal";
import pli from "~/public/imgs/pli.png";
import { useNavigate } from "react-router-dom";

const Market = () => {
    const selectedStock = useSelector((state) => state.stock.selectedStock);
    const stockList = useSelector((state) => state.stock.stockList);
    const turn = useSelector((state) => state.user.user.turn);
    const dispatch = useDispatch();

    const [modalSee, setModalSee] = useState(false);
    const [newsList, setNewsList] = useState([]);
    const [roundSee, setRoundSee] = useState(false);
    const [round, setRound] = useState(0);

    const saveStock = (el) => {
        if (selectedStock?.id === el.id) {
            dispatch(saveSelectedStock(null));
            return;
        }
        dispatch(saveSelectedStock(el));
        GetStockChart(el.id, turn)
            .then((data) => {
                const prices = data.map((el) => el.price);
                dispatch(savePrices(prices));
            })
            .catch((err) => console.log(err));
    };

    const navigate = useNavigate();
    const nextTurn = () => {
        if (turn === 155) {
            setRound(turn + 1);
            navigate("/ending");
        }
        setRound(turn + 1);
        setRoundSee(true);
        NextTurn(turn)
            .then((data) => {
                setTimeout(() => {
                    setRoundSee(false);
                    if (data.news.length > 0) {
                        setRoundSee(false);
                        setModalSee(true);
                        setNewsList(data.news);
                    }
                }, 1000);
                dispatch(saveTurn());
                dispatch(saveSelectedStock(null));
            })
            .catch((err) => console.log(err.response));
    };

    useEffect(() => {
        GetUserProfile()
            .then((data) => {
                if (data.turn >= 156) {
                    navigate("/ending");
                }

                dispatch(saveUser(data));
                GetStockList(data.turn)
                    .then((data) => {
                        dispatch(saveStockList(data));
                    })
                    .catch((err) => console.log(err.response));
            })
            .catch((err) => console.log(err.response));
    }, [turn]);

    useEffect(() => {
        if (selectedStock) {
            console.log(selectedStock);
            GetStockChart(selectedStock.id, turn)
                .then((data) => {
                    const prices = data.map((el) => el.price);
                    dispatch(savePrices(prices));
                })
                .catch((err) => console.log(err));
        }
    }, [selectedStock]);

    return (
        <div className="bg-background-pattern bg-cover bg-center h-screen">
            <Navbar />
            <div className="grid grid-cols-4 w-full h-[calc(100%_-_69.6px)] gap-6 p-6">
                <div className="bg-back-yellow col-span-3 h-full grid grid-cols-4 p-6 gap-6 rounded-3xl">
                    <div className="col-span-1 grid grid-rows-9 gap-1">
                        {stockList.map((el, i) => (
                            <StockCard
                                stock={el}
                                key={i}
                                selected={selectedStock?.name}
                                onClick={() => {
                                    saveStock(el);
                                }}
                            />
                        ))}
                    </div>
                    {selectedStock ? (
                        <StockDetail stock={selectedStock} />
                    ) : (
                        <div className="col-span-3 flex h-full justify-end items-end">
                            <img className="h-4/5" src={pli} alt="플리" />
                        </div>
                    )}
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
