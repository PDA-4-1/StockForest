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
            <div className="w-4/5 h-3/4 bg-[#FCFCFC] p-12 grid justify-items-center grid-rows-4">
                <div className="flex items-center border-t-4 border-[#4F4E53]">
                    <p className="text-6xl text-[#3E424B] w-fit ">
                        오늘의 <span className="text-sky-400">투자전략</span>
                    </p>
                </div>
                <div className="row-span-3 scroll-pr-6 scrollbar scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-back-yellow overflow-y-scroll">
                    <p className="break-keep leading-8 pr-1">{content}</p>
                </div>
            </div>
        </div>
    );
}
