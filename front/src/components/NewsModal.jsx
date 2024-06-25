import { useEffect, useState } from "react";

export default function NewsModal(props) {
    const onHide = props.onHide;
    const newsList = props.newsList;
    const [isSpin, setIsSpin] = useState(true);
    const handleModalClick = (e) => {
        if (e.target === e.currentTarget) {
            onHide();
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsSpin(false);
        }, 500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div
            className="z-10 bg-black/30 w-screen h-screen fixed left-0 top-0 flex justify-center items-center"
            onClick={handleModalClick}
        >
            <div
                className={`w-fit h-3/4 bg-[#FCFCFC] p-12 flex flex-col items-center ${
                    isSpin ? "animate-spin-fast" : ""
                }`}
            >
                <p className="text-7xl text-[#3E424B] w-fit border-t-4 border-[#4F4E53] pt-6">
                    THE DALIY <span className="text-[#EA071B]">NEWS</span>
                </p>
                {newsList && (
                    <div className="p-6 text-left w-full max-w-[625px] grid gap-12">
                        {newsList.map((el, i) => (
                            <p className="text-left text-wrap text-lg" key={i}>
                                {el.content}
                            </p>
                        ))}
                        {newsList.length < 2 && (
                            <div className="grid gap-2">
                                <div className="w-full bg-[#EBEBEB] h-4" />
                                <div className="w-3/5 bg-[#EBEBEB] h-4" />
                            </div>
                        )}
                        {newsList.length <= 2 && (
                            <div className="grid gap-2">
                                <div className="w-full bg-[#EBEBEB] h-4" />
                                <div className="w-2/5 bg-[#EBEBEB] h-4" />
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}