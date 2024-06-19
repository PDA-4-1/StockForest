import React, { useState } from "react";
import { RouterProvider, Route, Routes, BrowserRouter } from "react-router-dom";
import { routerObj } from "./routers/router";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store";

function renderRoutes(routesObj) {
    return routesObj.map((route) => {
        if (route.children) {
            return (
                <Route key={route.path} path={route.path} index={route.index} element={route.element}>
                    {route.children ? renderRoutes(route.children) : null}
                </Route>
            );
        }
        return <Route key={route.path} path={route.path} index={route.index} element={route.element} />;
    });
}

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Routes>{renderRoutes(routerObj)}</Routes>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
