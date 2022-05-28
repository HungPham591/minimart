import React from "react";
import {
    Route,
    RouteProps,
} from "react-router-dom";
// import { Screens } from "../constants";
// import { MainLayout } from "../layout";
// import { GlobalState } from "../stores/GlobalState";
interface IProps extends RouteProps {
    component: any;
}
function PublicRoute(props: IProps) {
    const { component: Component, ...rest } = props;
    const isAuthenticated = false;
    const child = () => {

    }
    return (
        <Route
            {...rest}
            element={<Component />}

        />
    );
}

export default PublicRoute;
