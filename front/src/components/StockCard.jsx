import { IoTriangleSharp } from "react-icons/io5";

export default function StockCard(props) {
    const { id, name, price, diff } = props.stock;
    const selected = props.selected;
    const onClick = props.onClick;
    const stockImages = {
        1: "/imgs/field/tomato/tomato1.png",
        2: "/imgs/field/banana/banana1.png",
        3: "/imgs/field/blueberry/blueberry1.png",
        4: "/imgs/field/peach/peach1.png",
        5: "/imgs/field/orange/orange1.png",
        6: "/imgs/field/melon/melon1.png",
        7: "/imgs/field/grape/grape1.png",
        8: "/imgs/field/apple/apple1.png",
        9: "/imgs/field/strawberry/strawberry2.png",
    };

    return (
        <div
            className={`${
                selected == name ? "bg-select-green" : "bg-white"
            } w-full rounded-3xl flex items-center justify-center px-3 space-x-2 hover:cursor-pointer hover:bg-select-green max-w-[180px]`}
            onClick={onClick}
        >
            <img src={stockImages[id]} className="w-9 h-9 rounded-full object-contain" />
            <div className="text-sm min-w-[100px]">
                <p className={selected == name ? "text-white" : ""}>{name}</p>
                <div
                    className={`
                        ${
                            diff > 0 ? "text-shinhan-red" : diff < 0 ? "text-shinhan-blue" : "text-black"
                        }  flex justify-between`}
                >
                    <span>{price.toLocaleString()}</span>
                    <div className="flex items-center ml-2">
                        <IoTriangleSharp className={diff < 0 ? "rotate-180" : diff == 0 ? "hidden" : ""} />
                        <span className="min-w-[34px] text-right">{Math.abs(diff).toLocaleString()}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
