import { useState, useEffect } from "react";
import axios from "axios";
import CompanyProfile from "./CompanyProfile";
import Profile from "./Profile";
import { useNavigate } from "react-router-dom";
import { Toast } from "./Toast";

const Field = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedStock, setSelectedStock] = useState([]);
    const [selectedStockName, setSelectedStockName] = useState(null);
    const [userStock, setUserStock] = useState([]);
    const navigate = useNavigate();

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
    }, []);

    const handleButtonClick = (image, name, stock) => {
        setSelectedImage(image);
        setSelectedStock(stock);
        setSelectedStockName(name);
        setIsVisible(true);
    };

    const handleClose = () => {
        setIsVisible(false);
        setSelectedImage(null);
    };

    const stockImages = {
        1: "/imgs/tomato/tomato1.png",
        2: "/imgs/tomato/tomato2.png",
        3: "/imgs/banana/banana5.png",
        4: "/imgs/tomato/tomato4.png",
        5: "/imgs/tomato/tomato5.png",
        6: "/imgs/banana/banana1.png",
        7: "/imgs/banana/banana2.png",
        8: "/imgs/banana/banana3.png",
        9: "/imgs/banana/banana4.png",
    };

    const signImages = {
        1: "/imgs/sign.png",
        2: "/imgs/sign.png",
        3: "/imgs/sign.png",
        4: "/imgs/sign.png",
        5: "/imgs/sign.png",
        6: "/imgs/sign.png",
        7: "/imgs/sign.png",
        8: "/imgs/sign.png",
        9: "/imgs/sign.png",
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
            return (
                <div
                    className="w-full h-full flex justify-center bg-[url('/imgs/field4.png')] bg-contain bg-no-repeat bg-center "
                    key={stock.stock_id}
                >
                    <img
                        src={stockImages[stock.stock_id]}
                        alt={`Field ${stock.stock_id}`}
                        className="cursor-pointer object-cover relative bottom-[40%]"
                        onClick={() =>
                            handleButtonClick(
                                stockImages[stock.stock_id],
                                stockName[stock.stock_id],
                                stock
                            )
                        }
                    />
                    {/* <img
                        src={signImages[stock.stock_id]}
                        alt={`Field ${stock.stock_id}`}
                        className="cursor-pointer object-cover relative"
                        onClick={() =>
                            handleButtonClick(
                                stockImages[stock.stock_id],
                                stockName[stock.stock_id],
                                stock
                            )
                        }
                    /> */}
                </div>
            );
        } else {
            return (
                <div
                    className="w-full h-full flex justify-center overflow-hidden bg-[url('/imgs/field4.png')] bg-contain bg-no-repeat bg-center"
                    key={`placeholder-${index}`}
                />
            );
        }
    });
    return (
        <div
            className="grid grid-cols-4 overflow-hidden"
            style={{ height: "calc(100vh - 70px)" }}
        >
            <div className="col-span-3 h-full relative overflow-hidden p-[100px] bg-[url('/imgs/file5.png')] bg-cover bg-no-repeat">
                <div className="grid grid-cols-3 grid-rows-3 place-items-center  h-full relative">
                    {fieldImages}
                </div>
            </div>
            <div className="col-span-1 bg-[url('/imgs/grass.png')] relative overflow-hidden">
                <div className="grid grid-rows-3 h-full">
                    <div className="row-span-1 bg-[url('/imgs/grass.png')]">
                        <Profile />
                    </div>
                    <div className="row-span-2 relative flex items-center justify-center bg-[url('/imgs/grass.png')]">
                        {!isVisible && (
                            <img
                                src="/imgs/character.png"
                                alt="Character"
                                className="w-full h-[400px]"
                            />
                        )}
                        <CompanyProfile
                            visible={isVisible}
                            onClose={handleClose}
                            image={selectedImage}
                            stock={selectedStock}
                            name={selectedStockName}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Field;
