import StockButton from "../StockButton";

export default function OrderModal(props) {
    const purpo = props.purpo;
    const onHide = props.onHide;
    const handleModalClick = (e) => {
        if (e.target === e.currentTarget) {
            onHide();
        }
    };
    return (
        <div
            className="z-10 bg-black/30 w-screen h-screen fixed left-0 top-0 flex justify-center items-center"
            onClick={handleModalClick}
        >
            <div className="w-[400px] h-fit bg-modal-yellow py-14 px-28 rounded-3xl grid justify-items-center gap-9">
                <p>{purpo == "sell" ? "판매서" : "주문서"}</p>
                <p>살 나무</p>
                <p>가격</p>
                <p>총 가격</p>
                <StockButton purpo={purpo} />
            </div>
        </div>
    );
}
