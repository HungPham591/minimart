import React from "react";
import {
    Route,
    RouteProps,
} from "react-router-dom";
interface IProps extends RouteProps {
    component: any;
}
function AuthRoute(props: IProps) {
    const { component: Component, ...rest } = props;
    return (
        <Route
            {...rest}
        >
            <Component />
        </Route>
    );
}

export default AuthRoute;
