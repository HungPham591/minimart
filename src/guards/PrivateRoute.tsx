import React from "react";
import {
    Route,
    RouteProps,
} from "react-router-dom";
interface IProps extends RouteProps {
    component: any;
}
function PrivateRoute(props: IProps) {
    const { component: Component, ...rest } = props;
    const isAuthenticated = false;
    const child = () => {
        if (!isAuthenticated) {
            const path = window.location.pathname;
            // GlobalState.setTargetScreen(path);
            // return <Redirect to={Screens.LOGIN_REDIRECT} />;
        }
        return (
            <Component />
        );

    }
    return (
        <Route
            {...rest}
        >
            {child()}
        </Route>
    );
}

export default PrivateRoute;
