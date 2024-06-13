import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const Profile = () => {
  const [asset, setAsset] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  const userInfoAPI = "api url";
  const assetAPI = "api url";

  useEffect(() => {
    //userInfo 초기화
    axios
      .get(userInfoAPI) //말고 post 써야 할거 같긴하다
      .then((res) => {
        setUserInfo(res.data);
      })
      .catch((err) => {
        console.error("초기 유저 정보를 불러오는데 실패했습니다.", err);
      });

    //asset 초기화
    axios
      .get(assetAPI)
      .then((res) => {
        setAsset(res.data);
      })
      .catch((err) => {
        console.error("초기 유저 자산을 불러오는데 실패했습니다.", err);
      });
  }, []);

    return (
        <div className="w-[400px] h-[300px] scale-200 bg-[url('/imgs/loginform.svg')] bg-no-repeat bg-center bg-cover flex flex-col justify-center items-center">
            <div className="flex justify-center items-center">
                <div className="w-[50px] h-[50px] rounded-full bg-black mr-4">
                    <img>{userInfo.image}</img>
                </div>
                <div className="text-left">
                    <div> 테스트닉네임{userInfo.nickname}</div>
                    <div className="mt-[10px]">
                        수익률: ??.??{asset.user_returns}%
                    </div>
                </div>
            </div>

            <div className="mt-[30px]">
                <div>자산: 100{asset.user_pdi} 프디</div>
            </div>

            <div className="flex items-center mt-[30px] justify-center gap-3">
                <div>10{userInfo.turns}턴</div>
                <button className="bg-yellow-500 text-white px-4 py-2 rounded">
                    다음 턴
                </button>
            </div>
        </div>
        <div className="text-left">
          <div> 테스트닉네임{userInfo.nickname}</div>
          <div className="mt-[10px]">수익률: ??.??{asset.user_returns}%</div>
        </div>
      </div>

      <div className="mt-[30px]">
        <div>자산: 100{asset.user_pdi} 프디</div>
      </div>

      <div className="flex items-center mt-[30px] justify-center gap-3">
        <div>10{userInfo.turns}턴</div>
        <button className="bg-yellow-500 text-white px-4 py-2 rounded">
          다음 턴
        </button>
      </div>
    </div>
  );
};

export default Profile;
