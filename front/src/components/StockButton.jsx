export default function StockButton(props) {
    const onClick = props.onClick;
    const purpo = props.purpo;
    const color = purpo == "sell" ? "bg-back-blue text-shinhan-blue" : "bg-back-red text-shinhan-red";

    return (
        <div
            className={`w-16 h-12 flex justify-center items-center rounded-lg hover:cursor-pointer hover:brightness-90 ${color}`}
            onClick={onClick}
        >
            <p>{purpo == "sell" ? "팔기" : "사기"}</p>
        </div>
    );
}
