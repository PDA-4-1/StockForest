import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { mainRouter } from "./main-router";
import { authRouter } from "./auth-router";

export const routerObj = [...authRouter, ...mainRouter];
const router = createBrowserRouter(routerObj);
export default router;
