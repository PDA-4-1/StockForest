import React from "react";
import { useState, useEffect } from "react";


const Bgm = () => {
  const [isPlay, setIsPlay] = useState(true);
  const bgmUrl = "https://stockforest.s3.ap-northeast-2.amazonaws.com/bgm/bgm_1h.mp3";
  console.log(`음악 실행 여부: ${isPlay}`);
    return (
      //isPlay redux 처리
      <>
        {isPlay && (
          <audio
            src= {bgmUrl}
            autoPlay={isPlay}
            volume={1.0}
            mute={false}
            > 
          </audio>
        )}
      </>
    );
};

export default Bgm;
