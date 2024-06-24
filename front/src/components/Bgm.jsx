import React from "react";
import { useSelector } from "react-redux";

const Bgm = () => {
    const bgmStatus = useSelector((state) => state.stock.bgmOn);
    const bgmUrl = "/bgm/bgm_1h.mp3";

    console.log(`음악 실행 여부: ${bgmStatus}`);
    return (
        <>
            <iframe
                src={bgmUrl}
                allow="autoplay"
                style={{ display: "none" }}
            ></iframe>
        </>
    );
};

export default Bgm;
