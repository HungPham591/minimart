import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Avatar, Grid, IconButton, LinearProgress, Switch, Toolbar, Typography } from "@mui/material";
import { makeStyles } from '@mui/styles';
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { openDrawer, selectLayout } from '../../../reducers/LayoutReducer';
import { selectProfile } from '../../../reducers/ProfileReducer';
import { changeTheme } from '../../../reducers/SettingReducer';



const useStyles = makeStyles({
    show: {
        transition: "0.3s",
    },
    hide: {
        color: "white",
        backgroundColor: "transparent",
        transition: "0.3s",
        boxShadow: "0px 0px"
    },
});
const styles = {
    show: {
        transition: "0.3s",
    },
    hide: {
        color: "white",
        backgroundColor: "transparent",
        transition: "0.3s",
        boxShadow: "0px 0px"
    },
};

function Header(props: any) {
    const classes = useStyles();
    const { data } = useSelector(selectProfile);
    const dispatch = useDispatch();
    const { navigating } = useSelector(selectLayout);

    const [show, setShow] = useState(false);
    const [switchChecked, setSwitchChecked] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const onThemeSwitchChange = () => {
        if (switchChecked) dispatch(changeTheme('dark'));
        else dispatch(changeTheme('light'));
        setSwitchChecked(!switchChecked);
    }
    const onMenuButtonCLick = () => {
        dispatch(openDrawer(false));
    }
    const handleScroll = (e: any) => {
        if (window.pageYOffset < 10) setShow(false)
        else setShow(true)
    }
    return (
        <AppBar style={show ? styles.show : styles.hide} position="fixed">
            <LinearProgress style={navigating ? { display: 'block' } : { display: 'none' }} />
            <Toolbar>
                <Grid spacing={3} container>
                    <Grid lg={2} display="flex" alignItems='center' justifyContent="space-between" item>
                        <IconButton onClick={onMenuButtonCLick} size="medium" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                            <MenuIcon />
                        </IconButton>
                        <Typography fontWeight="bold" variant="h6" component="div">
                            SHOPPING.COM
                        </Typography>
                    </Grid>
                    <Grid lg={7} item></Grid>
                    <Grid lg={3} display={{ xs: "none", lg: "flex" }} alignItems='center' justifyContent="space-around" item>
                        <Switch onChange={onThemeSwitchChange} checked={switchChecked} color="error" />
                        <h4>{data?.name}</h4>
                        <Avatar alt='avatar' src={data?.image}></Avatar>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}

export default React.memo(Header);