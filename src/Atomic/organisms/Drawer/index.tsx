import { ListAlt, ShoppingCart } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import { Avatar, Grid, IconButton, ListItemIcon, ListItemText, SwipeableDrawer, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import { makeStyles } from '@mui/styles';
import { Container } from '@mui/system';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import background from '../../../images/background.jpg';
import { closeDrawer, isNavigating, openDrawer, selectLayout } from '../../../reducers/LayoutReducer';
import { selectProfile } from '../../../reducers/ProfileReducer';
import BackendRoutes from '../../../routes/BackendRoutes';

type Anchor = 'top' | 'left' | 'bottom' | 'right';

const useStyles = makeStyles({
    drawerHeaderImage: {
        backgroundImage: `url(${background})`,
    },
})

const routes = Object.values(BackendRoutes);

function Drawer(props: any) {
    const classes = useStyles();
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const dispatch = useDispatch();
    const { data } = useSelector(selectProfile);
    const { drawerOpen } = useSelector(selectLayout);
    const anchor: Anchor = 'left';
    const toogleDrawer = (anchor: Anchor, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
            return;
        }
        dispatch(closeDrawer(false));
    }
    const onMenuButtonCLick = () => {
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
    const list = (anchor: Anchor) => {
        return (
            <Box
                width="30vw"
                minWidth="300px"
                role="presentation"
                onClick={toogleDrawer(anchor, false)}
                onKeyDown={toogleDrawer(anchor, false)}
            >
                <Box width="100%" height="200px" paddingY="10px" className={classes.drawerHeaderImage} color='white'>
                    <Container style={{ height: '100%' }}>
                        <Grid height='100%' container>
                            <Grid height='100%' display='flex' flexDirection='column' justifyContent="space-between" item>
                                <div>
                                    <IconButton onClick={onMenuButtonCLick} size="medium" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                                        <MenuIcon />
                                    </IconButton>
                                </div>
                                <div>
                                    <Avatar alt='avatar' src={data?.image} />
                                    <Typography margin="5px 0">{data?.name}</Typography>
                                </div>
                            </Grid>
                        </Grid>
                    </Container>
                </Box>
                <List>
                    {
                        routes.map((value, index) => (
                            <ListItem onClick={() => handleNavigateButtonClick(value?.path)} key={index} disablePadding>
                                <ListItemButton sx={{ backgroundColor: (checkRoute(value?.path)) ? '#E6E6E6' : "white" }}>
                                    <Box height="50px" display="flex" alignItems="center">
                                        <ListItemIcon sx={{ color: (checkRoute(value?.path)) ? 'primary.main' : "grey" }}>
                                            {value?.icon}
                                        </ListItemIcon>
                                        <ListItemText sx={{ color: (checkRoute(value?.path)) ? 'primary.main' : "grey" }} primary={value?.label} />
                                    </Box>
                                </ListItemButton>
                            </ListItem>
                        )
                        )
                    }
                </List>
            </Box >
        )
    };

    return (
        <React.Fragment key={anchor}>
            <SwipeableDrawer
                anchor={anchor}
                open={drawerOpen}
                onClose={() => dispatch(closeDrawer(false))}
                onOpen={() => dispatch(openDrawer(false))}
            >
                {list(anchor)}
            </SwipeableDrawer>
        </React.Fragment>
    )
}

export default React.memo(Drawer);