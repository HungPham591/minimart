import { ListAlt, ShoppingCart } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import { Avatar, Grid, IconButton, ListItemIcon, ListItemText, SwipeableDrawer } from '@mui/material';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import { withStyles } from '@mui/styles';
import { Container } from '@mui/system';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, matchRoutes, NavLink, useLocation } from 'react-router-dom';
import { closeDrawer, openDrawer, selectLayout } from '../../../../../reducers/layout.reducer';
import { selectProfile } from '../../../../../reducers/profile.reducer';
import background from '../../../images/background.jpg';

type Anchor = 'top' | 'left' | 'bottom' | 'right';

const styles = {
    listItem: {
        width: "30vw",
        minWidth: "300px",
    },
    drawerHeaderImage: {
        backgroundImage: `url(${background})`,
        width: "100%",
        height: "180px",
        paddingTop: "10px",
        paddingBottom: "10px"
    },
    link: {
        color: "grey"
    },
    activeLink: {
        color: "red"
    }
}
const listItem = [
    {
        icon: <ShoppingCart />,
        url: "/",
        title: "Sản phẩm"
    },
    {
        icon: <ListAlt />,
        url: "/category",
        title: 'Danh mục sản phẩm'

    },
];



function Drawer(props: any) {
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
    const list = (anchor: Anchor) => {
        return (
            <Box
                className={props.classes.listItem}
                role="presentation"
                onClick={toogleDrawer(anchor, false)}
                onKeyDown={toogleDrawer(anchor, false)}
            >
                <Box className={props.classes.drawerHeaderImage} color='white'>
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
                                    <h3>{data?.name}</h3>
                                </div>
                            </Grid>
                        </Grid>
                    </Container>
                </Box>
                <List>
                    {
                        listItem.map((value, index) => (
                            <Link key={index} style={{ textDecoration: 'none' }} to={value?.url}>
                                <ListItem key={index} disablePadding>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            {value.icon}
                                        </ListItemIcon>
                                        <ListItemText primary={value.title} />
                                    </ListItemButton>
                                </ListItem>
                            </Link>
                        )
                        )
                    }
                </List>
            </Box>
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

export default withStyles(styles)(Drawer);