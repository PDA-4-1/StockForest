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
                            <img
                                className="h-4/5"
                                src="https://stockforest.s3.ap-northeast-2.amazonaws.com/profile_img/pli.png?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDkaDmFwLW5vcnRoZWFzdC0yIkcwRQIgMdeqZwT4wvBYBy5DD7tMVHrGlUfNu8EU7US5BovNwD4CIQCuoUXxembleARqOlKk1YNzfQ0ojz8HZhWwt5bk9%2BU37SqGAwji%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDk5MjM4MjUwOTY3NiIMws9OLcsVqkmlNOg9KtoCMIBysGcPIQWsRSWIjtx%2FWACYYout3%2Ba9U15Ztl8gBtw%2B5glGiOZ3xJqUeobT%2FKY93l%2Fs3YTNxGB2o%2F%2B%2FmK3EFrLlRY073hJsMQ7%2FkWBaTWAQjcZ957OQeUomr%2Fdq6rPpnU5fUbNqDZySZlp9XAvsvmGVRNTSC%2FSz3Kll9JXSPDfao2VDBolAj2BTg0EgS3zyRuuYzdpQ4LAOQ0lKUs%2BpT4vlFIIxqzx29M%2BDI0WlZ32KWEr%2FgEzRJZNLShVvSKRD5NE8NvOvQoydLEBT7Dyi0X7Kisfr40ke1opXkJo6INsttsmHeMslidBYdEodudSpjFwGFqzSrqsMFHvfOYtfH%2FzVuX2R2m0pTH6a%2FPyvigaahqgqpo8ZAIqD6X8XCxIoJt8jzDST8DFot96kVOyQ6B%2BUTb%2BnqbnwHUBl9zfRsMgeRVLlfh386HlurOHIIyvL3kI7iNPGbTnvpjDz%2BfKzBjqzArz8J8EMoIlmSxB0wqZMSNNsXwy6CNKjNbSKQdRRfxR8VPs4n4kvQ5cwsqjCrpeKqJNBu6tax2%2B86SRCjCpn6rvawA6n4AdDESKnkQx1BFaP8hUvtlGBCs%2BTQdhNGggAN%2F7T8D6yEBibRL8JuUCgwhYbGKb1E30eTIOiY95NcZYbJ9XgFLYl1HX7k%2BcyqZciRTePigkjRazH%2F8yCwVlK1CbLfpmezkv9tpa5RuwQd4GKKNJNsGVxc7i5e3rwp%2B70zoXGKINjfHyy0cUXtboavUGcnvI042h%2F4jNPP9CIuZE6Z6vxZPHWFWgifdBjkV6JuJBNwMqFznxpTcap9KkpJqrlDMV6ZnWtgQokwTbLiWpY%2BQtLB04aS2fazw5q68Eblq64tWMsi2MI1vuAS8M6h4Body0%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240627T073046Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIA6ODU3MJWMM7VXTF5%2F20240627%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Signature=dd52cadb6adafeb8fba477ebd3258bbd08c0c7768faac67ebf71b9ead4970592"
                                alt="플리"
                            />
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
