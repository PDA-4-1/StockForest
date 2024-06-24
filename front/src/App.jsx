import React, { useState } from "react";
import { RouterProvider, Route, Routes, BrowserRouter } from "react-router-dom";
import { routerObj } from "./routers/router";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store";
import { PersistGate } from "redux-persist/integration/react";
import persistStore from "redux-persist/es/persistStore";

const persistor = persistStore(store);

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
            <PersistGate loading={null} persistor={persistor}>
                <BrowserRouter>
                    <Routes>{renderRoutes(routerObj)}</Routes>
                </BrowserRouter>
            </PersistGate>
        </Provider>
    );
}

export default App;
