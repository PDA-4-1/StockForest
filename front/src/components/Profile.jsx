import React from "react";

const Profile = () => {
    const [asset, setAsset] = useState([]);
    const [userInfo, setUserInfo] = useState([]);

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

export default Landing;
