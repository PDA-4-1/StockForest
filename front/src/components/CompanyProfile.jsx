import React from "react";

const CompanyProfile = ({ visible, onClose, image }) => {
    return (
        <div
            className={`fixed bottom-0 right-0 bg-[url('/imgs/companyprofile.svg')] bg-no-repeat bg-center bg-contain h-[500px] w-[400px] transition-transform duration-300 ${
                visible ? "translate-x-0" : "translate-x-full"
            }`}
        >
            {image && (
                <img
                    src={image}
                    className="w-[100px] h-[100px] absolute left-[95px] top-[40px]"
                    alt="Company"
                />
            )}
            <div className="absolute left-[220px] top-[80px]">삼성전자</div>
            <div className="absolute grid grid-cols-1 gap-4 mb-4 top-[200px] left-[120px]">
                <div>나의 주식수</div>
                <div>평단가</div>
                <div>수익률</div>
            </div>
            <button className="absolute top-[400px] left-[170px]">
                팔러가기
            </button>
            <button
                onClick={onClose}
                className="absolute top-[50px] right-[60px]"
            >
                X
            </button>
        </div>
    );
};

export default CompanyProfile;
