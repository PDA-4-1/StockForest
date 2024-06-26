import React, { useEffect } from "react";
import Navbar from "../../components/Navbar";
import Field from "../../components/Field";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Farm = () => {
    const turn = useSelector((state) => state.user.user.turn);
    const navigate = useNavigate();

    useEffect(() => {
        if (turn >= 156) {
            navigate("/ending");
        }
    });
    return (
        <div className="bg-background-pattern bg-cover bg-center max-h-full">
            <Navbar />
            <Field />
        </div>
    );
};
export default Farm;
