import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Avatar, Grid, IconButton, Switch, Toolbar, Typography, useTheme } from "@mui/material";
import { withStyles } from '@mui/styles';
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { openDrawer } from '../../../../../reducers/layout.reducer';
import { selectProfile } from '../../../../../reducers/profile.reducer';
import { changeTheme } from '../../../../../reducers/setting.reducer';


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
    const { data } = useSelector(selectProfile);
    const dispatch = useDispatch();

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
            <Toolbar>
                <Grid spacing={3} container>
                    <Grid lg={2} display="flex" alignItems='center' justifyContent="space-between" item>
                        <IconButton onClick={onMenuButtonCLick} size="medium" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
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

export default withStyles(styles)(Header);