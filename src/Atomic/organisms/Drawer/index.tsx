import { Box, Button, CssBaseline, Divider, Drawer, Typography, useMediaQuery, useTheme } from '@mui/material';
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
import Constants from '../../../constants/Constants';
import { openDrawer, selectLayout } from '../../../reducers/LayoutReducer';
import BackendRoutes from '../../../routes/BackendRoutes';
import MenuIcon from '@mui/icons-material/Menu';
import { fontSize } from '@mui/system';


const drawerWidth = Constants.DRAWER_WIDTH;

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

const CustomMiniDrawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
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

    const anchor = 'left';

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));


    const navigate = useNavigate();
    const { pathname } = useLocation();

    const handleMenuButton = () => {
        if (drawerOpen) dispatch(openDrawer(false));
        else dispatch(openDrawer(true));
    }
    const handleDrawerClose = () => {
        dispatch(openDrawer(false));
    }
    const handleMouseOver = () => {
        dispatch(openDrawer(true));
    }
    const handleMouseOut = () => {
        dispatch(openDrawer(false));
    }

    const checkRoute = (path: string) => {
        if (pathname === path) return true;
        return false;
    }
    const handleNavigateButtonClick = (path: string) => {
        // dispatch(isNavigating(true));
        navigate(path);
        // setTimeout(() => {
        //     navigate(path);
        //     dispatch(isNavigating(false));
        // }, 2000);
    }
    const list = () => {
        return (
            <List>
                <Box padding="5px">
                    <ListItem
                        sx={{ display: 'block' }}

                        disablePadding
                    >
                        <ListItemButton onClick={handleMenuButton} sx={{ '&:hover': { backgroundColor: 'white' } }}>
                            {
                                isMobile ?
                                    <></> :
                                    <ListItemIcon>
                                        <MenuIcon />
                                    </ListItemIcon>
                            }
                            <Typography variant='h6' fontWeight={'bold'}>Menu</Typography>
                            {/* <ListItemText  primary={"Menu"} /> */}
                        </ListItemButton>
                    </ListItem>
                </Box>
                {/* <Divider /> */}
                <Box marginTop={"10px"}>
                    {
                        BackendRoutes.map((value, index) => (
                            <Box key={index} padding="5px">
                                <ListItem
                                    sx={{ display: 'block' }}
                                    onClick={() => handleNavigateButtonClick(value?.path)}
                                    key={index}
                                    disablePadding
                                >
                                    <ListItemButton sx={{ backgroundColor: (checkRoute(value?.path)) ? 'primary.main' : "white", justifyContent: drawerOpen ? 'initial' : 'center', px: 2.5, borderRadius: "10px", '&:hover': { backgroundColor: (checkRoute(value?.path)) ? 'primary.main' : '' } }}>
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
                </Box>
            </List>
        )
    };

    return isMobile ?
        (
            <Drawer
                // variant="permanent"
                anchor={anchor}
                onClose={handleDrawerClose}
                open={drawerOpen}
            >
                {list()}
            </Drawer>
        )
        :
        (
            <CustomMiniDrawer variant="permanent" open={drawerOpen}>
                {list()}
            </CustomMiniDrawer>
        )
        ;
}

export default React.memo(MiniDrawer);


