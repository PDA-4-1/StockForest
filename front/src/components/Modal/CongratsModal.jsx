import cong from "~/public/imgs/cong.svg";

export default function CongratsModal() {
    return (
        <div className="z-10 bg-black/30 w-screen h-screen fixed left-0 top-0 flex justify-center items-center">
            <img src={cong} className="animate__animated animate__heartBeat" />
        </div>
    );
}
