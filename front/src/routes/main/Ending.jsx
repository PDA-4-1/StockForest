import Navbar from "../../components/Navbar";

export default function Ending() {
    return (
        <div className="bg-background-pattern bg-cover bg-center h-screen">
            <Navbar />
            <div className="w-full h-[calc(100%_-_69.6px)] flex justify-center items-center">
                <div className="w-[400px] min-h-[400px] h-fit bg-modal-yellow rounded-3xl grid p-6 justify-items-center gap-6">
                    <div className="w-40 h-40 rounded-full bg-white"></div>
                    <p>닉네임</p>
                    <p>15 위</p>
                    <p>수익 : 11.11 %</p>
                    <p>총프디 : 1,000,000 프디</p>
                    <button className="bg-button-yellow px-3 py-2 rounded-xl hover:brightness-75">다시하기</button>
                </div>
            </div>
        </div>
    );
}
