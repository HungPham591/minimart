import { Box } from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { CSSObject, styled, Theme } from '@mui/material/styles';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { closeDrawer, isNavigating, openDrawer, selectLayout } from '../../../reducers/LayoutReducer';
import BackendRoutes from '../../../routes/BackendRoutes';


const drawerWidth = 240;
const routes = Object.values(BackendRoutes);

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);


function MiniDrawer() {
    const { drawerOpen } = useSelector(selectLayout);
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const { pathname } = useLocation();

    const handleMouseOver = () => {
        dispatch(openDrawer(false));
    }
    const handleMouseOut = () => {
        dispatch(closeDrawer(false));
    }

    const checkRoute = (path: string) => {
        if (pathname === path) return true;
        return false;
    }
    const handleNavigateButtonClick = (path: string) => {
        dispatch(isNavigating(true));
        setTimeout(() => {
            navigate(path);
            dispatch(isNavigating(false));
        }, 2000);
    }
    const list = () => {
        return (
            <List>
                {
                    routes.map((value, index) => (
                        <Box key={index} padding="5px">
                            <ListItem sx={{ display: 'block' }} onClick={() => handleNavigateButtonClick(value?.path)} key={index} disablePadding>
                                <ListItemButton sx={{ backgroundColor: (checkRoute(value?.path)) ? 'primary.main' : "white", justifyContent: drawerOpen ? 'initial' : 'center', px: 2.5, borderRadius: "10px" }}>
                                    <ListItemIcon sx={{ color: (checkRoute(value?.path)) ? 'white' : "grey", minWidth: 0, mr: drawerOpen ? 3 : 'auto', justifyContent: 'center' }}>
                                        {value?.icon}
                                    </ListItemIcon>
                                    <ListItemText sx={{ color: (checkRoute(value?.path)) ? 'white' : "grey", opacity: drawerOpen ? 1 : 0 }} primary={value?.label} />
                                </ListItemButton>
                            </ListItem>
                        </Box>
                    )
                    )
                }
            </List>
        )
    };

    return (
        <div onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
            <Drawer variant="permanent" open={drawerOpen}>
                {list()}
            </Drawer>
        </div>
    );
}

export default React.memo(MiniDrawer);


