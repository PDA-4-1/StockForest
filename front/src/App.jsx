import React, { useState } from "react";
import { RouterProvider, Route, Routes, BrowserRouter } from "react-router-dom";
import { routerObj } from "./routers/router";
import "./index.css";

function renderRoutes(routesObj) {
    return routesObj.map((route) => {
        if (route.children) {
            return (
                <Route
                    key={route.path}
                    path={route.path}
                    index={route.index}
                    element={route.element}
                >
                    {route.children ? renderRoutes(route.children) : null}
                </Route>
            );
        }
        return (
            <Route
                key={route.path}
                path={route.path}
                index={route.index}
                element={route.element}
            />
        );
    });
}

function App() {
    return (
        <BrowserRouter>
            <Routes>{renderRoutes(routerObj)}</Routes>
        </BrowserRouter>
    );
}

export default App;
