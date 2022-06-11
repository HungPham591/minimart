import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { isNavigating } from '../../../reducers/LayoutReducer';
import BackendRoutes from '../../../routes/BackendRoutes';

const routes = Object.values(BackendRoutes);

function BottomNavigationBar(props: any) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { pathname } = useLocation();

    const checkRoute = (path: string) => {
        if (pathname === path) return true;
        return false;
    }

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        dispatch(isNavigating(true));
        setTimeout(() => {
            navigate(newValue);
            dispatch(isNavigating(false));
        }, 2000);
    }

    return (
        <Paper>
            <BottomNavigation value={pathname} onChange={handleChange}>
                {
                    routes.map((value, index) => (
                        <BottomNavigationAction
                            key={index}
                            label={value?.label}
                            sx={{ color: (checkRoute(value?.path)) ? 'primary.main' : "grey" }}
                            value={value?.path} icon={value?.icon}
                        />
                    )
                    )
                }
            </BottomNavigation>
        </Paper>
    )
}
export default React.memo(BottomNavigationBar);