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
            {/* <div className="absolute top-[70px] w-[calc(100%-400px)] h-[calc(100vh-70px)] bg-[url('/imgs/fence.png')] z-10 bg-no-repeat bg-cover"></div> */}
            <div className="grid grid-cols-3 grid-rows-3 absolute top-[130px] left-[70px] w-[calc(100%-500px)] h-[calc(100vh-170px)] place-items-center bg-[url('/imgs/field.jpg')]">
                {images.map((src, index) => (
                    <div className="w-[200px] h-[250px] flex justify-center overflow-hidden">
                        <img
                            key={index}
                            src={src}
                            alt={`Field ${index + 1}`}
                            className="cursor-pointer object-cover "
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
