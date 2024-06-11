import React from "react";
import Login from "../routes/login/Login";
import Signup from "../routes/signup/Signup";
import Landing from "../routes/landingPage/Landing"

const authRouter = [
    {
        path: "/",
        element: <Landing />,
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
