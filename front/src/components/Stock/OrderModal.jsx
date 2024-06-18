import StockButton from "../StockButton";

export default function OrderModal(props) {
    const purpo = props.purpo;
    const onHide = props.onHide;
    const stockId = props.stockId;
    const price = props.price;
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
            <div className="w-[400px] h-fit bg-modal-yellow rounded-3xl grid justify-items-center">
                {purpo == "sell" ? (
                    <div className="text-center">
                        <p>판매서</p>
                        <div className="flex">
                            <p>내 나무</p>
                            <p>?? 그루</p>
                        </div>
                        <div className="flex">
                            <p>팔 나무</p>
                            <input type="number" />
                            <p>그루</p>
                        </div>
                        <div className="flex">
                            <p>가격</p>
                            <p>{price}원</p>
                        </div>
                        <div className="flex">
                            <p>총 가격</p>
                            <p>원</p>
                        </div>
                    </div>
                ) : (
                    <div className="text-center">
                        <p>주문서</p>
                        <div className="flex">
                            <p>살 나무</p>
                            <input type="number" />
                            <p>그루</p>
                        </div>
                        <div className="flex">
                            <p>가격</p>
                            <p>{price}원</p>
                        </div>
                        <div className="flex">
                            <p>총 가격</p>
                            <p>원</p>
                        </div>
                    </div>
                )}

                <StockButton purpo={purpo} />
            </div>
        </div>
    );
}
