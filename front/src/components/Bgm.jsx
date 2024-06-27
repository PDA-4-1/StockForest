import React from "react";
import { useSelector } from "react-redux";
import { useRef, useEffect } from "react";

const Bgm = () => {
    const bgmStatus = useSelector((state) => state.stock.bgmOn);
    const bgmUrl =
        "https://stockforest.s3.ap-northeast-2.amazonaws.com/bgm/bgm_1h.mp3";
    const audioRef = useRef(null);

    useEffect(() => {
        if (audioRef.current) {
            if (bgmStatus) {
                audioRef.current.play();
            } else {
                audioRef.current.pause();
            }
        }
    }, [bgmStatus]);

    console.log(`음악 실행 여부: ${bgmStatus}`);
    return (
        <audio ref={audioRef} src={bgmUrl} loop style={{ display: "none" }} />
    );
};

export default Bgm;
