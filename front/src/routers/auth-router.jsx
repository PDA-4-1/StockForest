import React from "react";
import Login from "../routes/login/Login";
import Signup from "../routes/signup/Signup";
import landingPage from "../routes/landingPage/landingPage";

const authRouter = [
    {
        path: "/",
        element: <landingPage />,
        index: true,
    },
    {
        path: "/login",
        element: <Login />,
        index: true,
    },
    {
        path: "/signup",
        element: <Signup />,
    },
];

export { authRouter };
export default authRouter;
