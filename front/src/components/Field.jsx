import { useState, useEffect } from "react";
import axios from "axios";
import CompanyProfile from "./CompanyProfile";
import { useNavigate } from "react-router-dom";
import { Toast } from "./Toast";
import FarmProfile from "./FarmProfile";
import { useSelector } from "react-redux";
import { GetStockCount } from "../lib/apis/stock";

const Field = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedStock, setSelectedStock] = useState([]);
    const [selectedStockName, setSelectedStockName] = useState(null);
    const [currentPrice, setCurrentPrice] = useState(null);
    const [userStock, setUserStock] = useState([]);
    const navigate = useNavigate();
    const userInfo = useSelector((state) => state.user.user);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const getStock = await axios.get("/api/farm");
                const stockdata = getStock.data;
                const filteredStock = stockdata.filter(
                    (stock) =>
                        stock.stock_id >= 1 &&
                        stock.stock_id <= 9 &&
                        stock.quantity > 0
                );
                setUserStock(filteredStock);
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    Toast.fire("로그인 하세요!", "", "error");
                    navigate("/");
                } else {
                    console.error("Error :", error);
                }
            }
        };

        fetchData();
    }, [navigate]);

    const handleButtonClick = (image, name, stock) => {
        setSelectedImage(image);
        setSelectedStock(stock);
        GetStockCount(stock.stock_id, userInfo.turn).then((data) => {
            console.log(data);
            if (data.length > 0) {
                setCurrentPrice(data[0].price);
            } else {
                Toast.fire("보유 주식이 없어요!", "", "error");
            }
        });
        setSelectedStockName(name);
        setIsVisible(true);
    };

    const handleClose = () => {
        setIsVisible(false);
        setSelectedImage(null);
    };

    const getStockImage = (stockId, profit) => {
        const stockImages = {
            1: "field/tomato/tomato",
            2: "field/banana/banana",
            3: "field/blueberry/blueberry",
            4: "field/peach/peach",
            5: "field/orange/orange",
            6: "field/melon/melon",
            7: "field/grape/grape",
            8: "field/apple/apple",
            9: "field/strawberry/strawberry",
        };

        let imageType;
        if (profit <= -30) {
            return `/imgs/ground.png`;
        } else if (profit > -30 && profit <= -15) {
            imageType = "1.png";
        } else if (profit > -15 && profit <= 0) {
            imageType = "2.png";
        } else if (profit > 0 && profit <= 15) {
            imageType = "3.png";
        } else if (profit > 15 && profit <= 30) {
            imageType = "4.png";
        } else {
            imageType = "5.png";
        }

        return `/imgs/${stockImages[stockId]}${imageType}`;
    };

    const signImages = {
        1: "/imgs/field/sign/samsung.png",
        2: "/imgs/field/sign/kakao.png",
        3: "/imgs/field/sign/sm.png",
        4: "/imgs/field/sign/hyundai.png",
        5: "/imgs/field/sign/cell.png",
        6: "/imgs/field/sign/gs.png",
        7: "/imgs/field/sign/amore.png",
        8: "/imgs/field/sign/shilla.png",
        9: "/imgs/field/sign/lg.png",
    };

    const stockName = {
        1: "콩순전자",
        2: "도토리톡",
        3: "뉴진수퍼노바",
        4: "주식회사붕붕",
        5: "미미네약국",
        6: "철수건설",
        7: "올리브업",
        8: "숲속여관",
        9: "과학나라",
    };

    const fieldImages = Array.from({ length: 9 }, (_, index) => {
        if (index < userStock.length) {
            const stock = userStock[index];
            const profit = stock.returns;
            const stockImage = getStockImage(stock.stock_id, profit);

            return (
                <div
                    className="w-full h-full flex justify-center items-end bg-[url('/imgs/field4.png')] bg-contain bg-no-repeat bg-center relative"
                    key={stock.stock_id}
                >
                    <img
                        src={stockImage}
                        alt={`Field ${stock.stock_id}`}
                        className="cursor-pointer object-cover relative bottom-[40%] responsive-height"
                        onClick={() =>
                            handleButtonClick(
                                stockImage,
                                stockName[stock.stock_id],
                                stock
                            )
                        }
                    />
                    <div className="absolute bottom-0 right-0 mb-2 mr-2 flex items-end">
                        <img
                            src={signImages[stock.stock_id]}
                            alt={`Sign ${stock.stock_id}`}
                            className="cursor-pointer object-cover mb-[3vh] mr-[3vw]"
                            onClick={() =>
                                handleButtonClick(
                                    stockImage,
                                    stockName[stock.stock_id],
                                    stock
                                )
                            }
                        />
                    </div>
                </div>
            );
        } else {
            return (
                <div
                    className="w-full h-full flex justify-center overflow-hidden bg-[url('/imgs/field4.png')] bg-contain bg-no-repeat bg-center relative"
                    key={`placeholder-${index}`}
                />
            );
        }
    });

    return (
        <div
            className="grid grid-cols-4 overflow-hidden bg-[url('imgs/file5.png')]"
            style={{ height: "calc(100vh - 70px)" }}
        >
            {/* <img src="imgs/pat.png" className="w-[200px] absolute z-30 left-[870px]"></img> */}
            <div className="col-span-3 h-full relative overflow-hidden pt-[70px] pl-[70px] pr-[70px]">
                <div className="grid grid-cols-3 grid-rows-3 place-items-center h-full relative">
                    {fieldImages}
                </div>
            </div>
            <div className="col-span-1 relative overflow-hidden">
                <div className="grid grid-rows-3 h-full">
                    <div className="row-span-1 ">
                        <FarmProfile />
                    </div>
                    <div className="row-span-2 relative flex items-center justify-center">
                        {!isVisible && (
                            <img
                                src="imgs/house.png"
                                alt="Character"
                                className="w-full"
                            />
                        )}
                        <CompanyProfile
                            visible={isVisible}
                            onClose={handleClose}
                            image={selectedImage}
                            stock={selectedStock}
                            name={selectedStockName}
                            currentPrice={currentPrice}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Field;
