import { useState } from "react";
import CompanyProfile from "./CompanyProfile";
import Profile from "./Profile";

const Field = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const handleButtonClick = (image) => {
        setSelectedImage(image);
        setIsVisible(true);
    };

    const handleClose = () => {
        setIsVisible(false);
        setSelectedImage(null);
    };

    const images = [
        "/imgs/tomato/tomato1.png",
        "/imgs/tomato/tomato2.png",
        "/imgs/tomato/tomato3.png",
        "/imgs/tomato/tomato4.png",
        "/imgs/tomato/tomato5.png",
        "/imgs/tomato/tomato2.png",
        "/imgs/tomato/tomato3.png",
        "/imgs/tomato/tomato4.png",
        "/imgs/tomato/tomato5.png",
    ];

    return (
        <div
            className="grid grid-cols-5 overflow-hidden"
            style={{ height: "calc(100vh - 70px)" }}
        >
            <div className="col-span-4 h-full relative overflow-hidden">
                <div className="bg-[url('/imgs/fence.png')] bg-cover bg-no-repeat w-full h-full z-10 absolute top-0 left-0"></div>
                <div className="grid grid-cols-3 grid-rows-3 place-items-center bg-[url('/imgs/field1.png')] h-full z-1 relative">
                    {images.map((src, index) => (
                        <div
                            className="w-[250px] h-[200px] flex justify-center overflow-hidden"
                            key={index}
                        >
                            <img
                                src={src}
                                alt={`Field ${index + 1}`}
                                className="cursor-pointer object-cover z-30"
                                onClick={() => handleButtonClick(src)}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <div className="col-span-1 bg-[url('/imgs/grass.png')] relative overflow-hidden">
                <div className="grid grid-rows-3 h-full">
                    <div className="row-span-1 bg-[url('/imgs/grass.png')]">
                        <Profile />
                    </div>
                    <div className="row-span-2 relative flex items-center justify-center bg-[url('/imgs/grass.png')]">
                        {!isVisible && (
                            <img
                                src="/imgs/character.png"
                                alt="Character"
                                className="w-full h-[400px]"
                            />
                        )}
                        <CompanyProfile
                            visible={isVisible}
                            onClose={handleClose}
                            image={selectedImage}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Field;
