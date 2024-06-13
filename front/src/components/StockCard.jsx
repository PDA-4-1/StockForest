import { IoTriangleSharp } from "react-icons/io5";

export default function StockCard(props) {
    const { name, price, diff } = props.stock;
    const selected = props.selected;
    const onClick = props.onClick;

    return (
        <div
            className={`${
                selected == name ? "bg-select-green" : "bg-white"
            } w-full rounded-3xl flex items-center space-x-2 justify-center px-3 space-x-2 hover:cursor-pointer hover:bg-select-green max-w-[180px]`}
            onClick={onClick}
        >
            <div className="w-9 h-9 rounded-full bg-black"></div>
            <div className="text-sm min-w-[100px]">
                <p className={selected == name && "text-white"}>{name}</p>
                <div
                    className={
                        diff >= 0 ? "text-shinhan-red flex justify-between" : "text-shinhan-blue flex justify-between"
                    }
                >
                    <span>{price.toLocaleString()}</span>
                    <div className="flex items-center ml-2">
                        <IoTriangleSharp className={diff <= 0 && "rotate-180"} />
                        <span className="min-w-[34px] text-right">{Math.abs(diff).toLocaleString()}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
