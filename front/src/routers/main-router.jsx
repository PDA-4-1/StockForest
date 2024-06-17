import React from "react";
import Landing from "../routes/landingPage/Landing";
import Market from "../routes/main/Market";
import Farm from "../routes/main/Farm";
import Quiz from "../routes/main/Quiz";
import MainLayPage from "../routes/main/layout";

const mainRouter = [
    {
        path: "/",
        element: <MainLayPage />,
        children: [
            {
                path: "",
                element: <Landing />,
                index: true,
            },
            {
                path: "market",
                element: <Market />,
                index: true,
            },
            {
                path: "farm",
                element: <Farm />,
                index: true,
            },
            {
                path: "quiz",
                element: <Quiz />,
                index: true,
            },
        ],
    },
];

export { mainRouter };
export default mainRouter;
