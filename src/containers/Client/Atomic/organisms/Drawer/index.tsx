import { ListAlt, ShoppingCart } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import { Avatar, Grid, IconButton, SwipeableDrawer } from '@mui/material';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import { withStyles, makeStyles } from '@mui/styles';
import { Container } from '@mui/system';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { closeDrawer, isNavigating, openDrawer, selectLayout } from '../../../../../reducers/layout.reducer';
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
    userName: {
        margin: "5px 0"
    },
    link: {
        height: "60px",
        color: "grey"
    },
    activeLink: {
        height: "60px",
        backgroundColor: '#E6E6E6',
        color: "red"
    },
    linkItem: {
        textDecoration: 'none',
    },
    listItemText: {
        fontSize: "17px",
        fontWeight: "500",
        padding: "0 20px"
    },
    listItemButton: {
        height: "60px",
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
                                    <h3 className={props?.classes?.userName}>{data?.name}</h3>
                                </div>
                            </Grid>
                        </Grid>
                    </Container>
                </Box>
                <List>
                    {
                        listItem.map((value, index) => (
                            <ListItem onClick={() => handleNavigateButtonClick(value?.url)} className={checkRoute(value?.url) ? props?.classes?.activeLink : props?.classes?.link} key={index} disablePadding>
                                <ListItemButton className={props?.classes?.listItemButton}>
                                    {value.icon}
                                    <p className={props?.classes?.listItemText}>
                                        {value.title}
                                    </p>
                                </ListItemButton>
                            </ListItem>
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