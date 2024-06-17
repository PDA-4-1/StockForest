import React from "react";
import { useState, useEffect } from "react";


const Bgm = () => {
  const audioRef = React.useRef()
  const [isPlay, setIsPlay] = useState(true);
  const bgmUrl = "/bgm/bgm_1h.mp3";
  // useEffect(()=>{
  //   console.log(audioRef)
  // audioRef.current.play()
  // }, [])
  console.log(`음악 실행 여부: ${isPlay}`);
    return (
      //isPlay redux 처리
      <>
        {/* {isPlay && (
          <audio
            src= {bgmUrl}
            ref={audioRef}
            // autoPlay={isPlay}
            volume={1.0}
            > 
          </audio>
        )} */}
        <iframe src= {bgmUrl} allow="autoplay" style={{ display: "none" }}></iframe>
      </>
    );
};

export default Bgm;
