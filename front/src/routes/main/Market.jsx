import { useState } from "react";
import Navbar from "../../components/Navbar";
import StockCard from "../../components/StockCard";

const Market = () => {
    const stockList = [
        {
            title: "미미전자",
            price: 3000,
            change: "up",
            value: 300,
        },
        {
            title: "미미자동차",
            price: 33000,
            change: "down",
            value: 300,
        },
        {
            title: "미미화장품",
            price: 3000,
            change: "down",
            value: 300,
        },
        {
            title: "미미엔터",
            price: 3000,
            change: "up",
            value: 50,
        },
        {
            title: "미미IT",
            price: 3000,
            change: "down",
            value: 300,
        },
        {
            title: "미미건설",
            price: 3000,
            change: "down",
            value: 300,
        },
        {
            title: "미미제약",
            price: 3000,
            change: "down",
            value: 300,
        },
        {
            title: "미미호텔",
            price: 13000,
            change: "up",
            value: 8,
        },
        {
            title: "미미화학",
            price: 3000,
            change: "down",
            value: 300,
        },
    ];

    const [selected, setSelected] = useState("");

    return (
        <div className="bg-background-pattern bg-cover bg-center h-screen">
            <Navbar />
            <div className="grid grid-cols-4 w-full h-[calc(100%_-_69.6px)] gap-6 p-6">
                <div className="bg-back-yellow col-span-3 h-full grid grid-cols-4 p-6 gap-6">
                    <div className="col-span-1 grid grid-rows-9 gap-1">
                        {stockList.map((el, i) => (
                            <StockCard stock={el} key={i} selected={selected} onClick={() => setSelected(el.title)} />
                        ))}
                    </div>
                    <div className="col-span-3">
                        <p>여기가 주식 디테일</p>
                    </div>
                </div>
                <div className="grid grid-rows-3 h-full gap-6">
                    <div className="bg-back-yellow">여기 프로필 부분</div>
                    <div className="row-span-2 bg-back-yellow">여기는 랭킹 부분</div>
                </div>
            </div>
        </div>
    );
};
export default Market;
