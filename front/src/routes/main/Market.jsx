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
import NewsModal from "../../components/NewsModal";

const Market = () => {
    const stockList = useSelector((state) => state.stock.stockList);
    const [selected, setSelected] = useState(null);
    const turn = useSelector((state) => state.user.user.turn);
    const [modalSee, setModalSee] = useState(true);
    const [newsList, setNewsList] = useState([
        {
            content:
                "원인을 알 수 없는 독감이 발생했어요. 이 독감은 전염성이 아주 강하고, 걸리면 너무 너무 아파요. 많은 의사, 과학자들이 독감 바이러스를 연구하고 있지만 치료제가 나오려면 오래 걸릴거 같아요. 독감의 이름은 말벌독감이라고 지었어요",
            id: 1,
        },
        // {
        //     content: "말벌 독감으로 인해 여행을 가는 사람들이 엄청 줄어들었어요.",
        //     id: 1,
        // },
    ]);
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
        NextTurn(turn, 16)
            .then((data) => {
                console.log(data);
                if (data.news) {
                    setModalSee(true);
                    setNewsList(data.news);
                }
                dispatch(saveStockList(data.stocks));
                dispatch(saveTurn());
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
        </div>
    );
};
export default Market;
