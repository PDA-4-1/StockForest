import Navbar from "../../components/Navbar";

const Market = () => {
    return (
        <div className="bg-background-pattern bg-cover bg-center h-screen">
            <Navbar />
            <div className="grid grid-cols-3 w-full h-[calc(100%_-_69.6px)] gap-6 p-6">
                <div className="bg-back-yellow col-span-2 h-full"></div>
                <div className="grid grid-rows-3 h-full gap-6">
                    <div className="bg-back-yellow">여기 프로필 부분</div>
                    <div className="row-span-2 bg-back-yellow">여기는 랭킹 부분</div>
                </div>
            </div>
        </div>
    );
};
export default Market;
