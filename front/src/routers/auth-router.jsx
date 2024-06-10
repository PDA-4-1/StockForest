import React from "react";
import Login from "../routes/login/Login";
import Signup from "../routes/signup/Signup";

const authRouter = [
    {
        path: "/",
        element: <Login />,
        index: true, //
    },
    {
        path: "/signup",
        element: <Signup />,
    },
];

export { authRouter };
export default authRouter;
