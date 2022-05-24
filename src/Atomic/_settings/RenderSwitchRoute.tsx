
import * as _ from 'lodash';
import React from "react";
import { Route, Routes } from "react-router-dom";

const RenderSwitchRoute = (routes: any) => {

    routes = _.values(routes);
    return (
        <Routes>
            {
                routes.map((value: any, index: any) => (
                    <Route index={index} path={value.path} element={<value.component></value.component>} />
                ))
            }
        </Routes>
    );
}
export default RenderSwitchRoute;