
import React from "react";
import { Route, Routes } from "react-router-dom";

const RenderSwitchRoute = (routes: any) => {

    routes = Object.values(routes);
    return (
        <Routes>
            {
                routes.map((value: any, index: any) => (
                    <Route key={index} path={value.path} element={<value.component />} />
                ))
            }
        </Routes>
    );
}
export default RenderSwitchRoute;