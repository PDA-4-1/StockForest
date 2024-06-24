import { useState, useEffect } from "react";
import axios from "axios";
import CompanyProfile from "./CompanyProfile";
import { useNavigate } from "react-router-dom";
import { Toast } from "./Toast";
import FarmProfile from "./FarmProfile";
import { useSelector } from "react-redux";

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
                    (stock) => stock.stock_id >= 1 && stock.stock_id <= 9
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

    // const fetchData2 = async () => {
    //     try {
    //         console.log("get하기전");
    //         const getCurrentPrice = await axios.get(
    //             `/api/market/sell/${selectedStock.stock_id}/${userInfo.turn}`
    //         );
    //         const stockdata = getCurrentPrice.data;
    //         setCurrentPrice(stockdata.price);
    //         console.log("get한 후");
    //     } catch (error) {
    //         if (error.response && error.response.status === 401) {
    //             Toast.fire("로그인 하세요!", "", "error");
    //             navigate("/");
    //         } else {
    //             console.error("Error :", error);
    //         }
    //     }
    // };

    const handleButtonClick = (image, name, stock) => {
        setSelectedImage(image);
        setSelectedStock(stock);
        setSelectedStockName(name);
        setIsVisible(true);
    };

    // useEffect(() => {
    //     if (selectedStock && selectedStock.stock_id) {
    //         fetchData2();
    //     }
    // }, [selectedStock]);

    const handleClose = () => {
        setIsVisible(false);
        setSelectedImage(null);
    };

    const getStockImage = (stockId, profit) => {
        const stockImages = {
            1: "tomato/tomato",
            2: "banana/banana",
            3: "blueberry/blueberry",
            4: "peach/peach",
            5: "orange/orange",
            6: "melon/melon",
            7: "grape/grape",
            8: "apple/apple",
            9: "strawberry/strawberry",
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
        1: "/imgs/sign/samsung.png",
        2: "/imgs/sign/kakao.png",
        3: "/imgs/sign/sm.png",
        4: "/imgs/sign/hyundai.png",
        5: "/imgs/sign/cell.png",
        6: "/imgs/sign/gs.png",
        7: "/imgs/sign/amore.png",
        8: "/imgs/sign/shilla.png",
        9: "/imgs/sign/lg.png",
    };

    const stockName = {
        1: "삼성",
        2: "카카오",
        3: "SM",
        4: "현대",
        5: "셀트리온",
        6: "GS",
        7: "아모레퍼시픽",
        8: "신라호텔",
        9: "lg화학",
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
                        className="cursor-pointer object-cover relative bottom-[40%]"
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
            <div className="col-span-3 h-full relative overflow-hidden p-[70px]">
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
