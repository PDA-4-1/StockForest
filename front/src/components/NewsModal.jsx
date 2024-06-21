export default function NewsModal(props) {
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
            <div className="w-fit h-3/5 bg-[#FCFCFC] p-12 flex flex-col items-center">
                <p className="text-7xl text-[#3E424B] w-fit border-t-4 border-[#4F4E53] pt-6">
                    THE DALIY <span className="text-[#EA071B]">NEWS</span>
                </p>
                <div className="p-6 text-left w-full">
                    <p className="text-left">뉴스</p>
                </div>
            </div>
        </div>
    );
}
