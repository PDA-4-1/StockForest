import React, { useState } from "react";
import CompanyProfile from "./CompanyProfile";

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
        "/imgs/samsung.png",
        "/imgs/hyundai.png",
        "/imgs/celltrion.jpg",
        "/imgs/amorepacfic.png",
        "/imgs/gs.jpg",
        "/imgs/shilla.png",
        "/imgs/kakao.jpg",
        "/imgs/lg.jpg",
        "/imgs/sm.png",
    ];

    return (
        <div>
            <div className="grid grid-cols-3 grid-rows-3 gap-y-[100px] relative top-[200px] w-[1200px] place-items-center text-center ">
                {images.map((src, index) => (
                    <img
                        key={index}
                        src={src}
                        alt={`Field ${index + 1}`}
                        className="cursor-pointer w-[100px] h-[100px]"
                        onClick={() => handleButtonClick(src)}
                    />
                ))}
            </div>
            <CompanyProfile
                visible={isVisible}
                onClose={handleClose}
                image={selectedImage}
            />
        </div>
    );
};

export default Field;
