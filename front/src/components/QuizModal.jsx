export default function QuizModal(props) {
    const onHide = props.onHide;
    const content = props.content;
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
            <div className="w-fit h-3/4 bg-[#FCFCFC] p-12 flex flex-col items-center">
                <p className="text-7xl text-[#3E424B] w-fit border-t-4 border-[#4F4E53] pt-6">
                    오늘의 <span className="text-sky-400">투자전략</span>
                </p>
                <p>{content}</p>
            </div>
        </div>
    );
}
