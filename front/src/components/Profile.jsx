import React from "react";

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
        <div style={{ display: "flex" }}>
            <img>{userInfo.image}</img>
            <div>
                <p>{userInfo.nickname}</p>
                <p>수익률: {asset.user_returns}%</p>
            </div>
            <p>자산: {asset.user_pdi} 프디</p>
        </div>
    );
};

export default Profile;
