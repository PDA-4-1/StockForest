import { IoTriangleSharp } from "react-icons/io5";

export default function StockCard(props) {
    const { title, price, change, value } = props.stock;
    const selected = props.selected;

    return (
        <div
            className={`${
                selected == title ? "bg-select-green" : "bg-white"
            } w-full rounded-3xl flex items-center space-x-2 justify-center px-3 space-x-2 hover:cursor-pointer hover:bg-select-green max-w-[180px]`}
        >
            <div className="w-9 h-9 rounded-full bg-black"></div>
            <div className="text-sm min-w-[100px]">
                <p className={selected == title && "text-white"}>{title}</p>
                <div
                    className={
                        change == "up"
                            ? "text-shinhan-red flex justify-between"
                            : "text-shinhan-blue flex justify-between"
                    }
                >
                    <span>{price.toLocaleString()}</span>
                    <div className="flex items-center ml-2 space-x-1">
                        <IoTriangleSharp className={change == "down" && "rotate-180"} />
                        <span>{value}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
