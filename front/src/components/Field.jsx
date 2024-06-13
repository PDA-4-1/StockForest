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
        <div>
            <div className="grid grid-cols-3 grid-rows-3 absolute top-[70px] w-[calc(100%-400px)] h-[calc(100vh-70px)] place-items-center">
                {images.map((src, index) => (
                    <div className="w-[300px] h-[200px] flex justify-center">
                        <img
                            key={index}
                            src={src}
                            alt={`Field ${index + 1}`}
                            className="cursor-pointer"
                            onClick={() => handleButtonClick(src)}
                        />
                    </div>
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
