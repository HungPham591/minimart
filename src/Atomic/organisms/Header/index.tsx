import { AppBar, Avatar, Box, Grid, Switch, Toolbar, Tooltip, Typography, useMediaQuery, useTheme } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { selectProfile } from '../../../reducers/ProfileReducer';
import { changeTheme } from '../../../reducers/SettingReducer';



function Header(props: any) {
    const { data } = useSelector(selectProfile);
    const dispatch = useDispatch();

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const [switchChecked, setSwitchChecked] = useState(false);


    const onThemeSwitchChange = () => {
        if (switchChecked) dispatch(changeTheme('dark'));
        else dispatch(changeTheme('light'));
        setSwitchChecked(!switchChecked);
    }

    return (
        <AppBar>
            <Toolbar>
                <Grid spacing={3} container>
                    <Grid lg={2} md={2} xs={5} display="flex" alignItems='center' justifyContent="space-between" item>
                        <Typography fontWeight="bold" variant="h6" component="div">
                            DASHBOARD
                        </Typography>
                    </Grid>
                    <Grid lg={7} md={7} xs={2} item></Grid>
                    <Grid lg={3} md={3} xs={5} display="flex" alignItems='center' justifyContent={isMobile ? "flex-end" : "space-around"} item>
                        <Box style={{ display: isMobile ? "none" : "block" }}>
                            <Tooltip title="theme">
                                <Switch onChange={onThemeSwitchChange} checked={switchChecked} color="error" />
                            </Tooltip>
                        </Box>
                        <Typography style={{ display: isMobile ? "none" : "block" }} fontSize="16px" fontWeight="bold" noWrap>{data?.name}</Typography>
                        <Avatar alt='avatar' src={data?.image} />
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}

export default React.memo(Header);