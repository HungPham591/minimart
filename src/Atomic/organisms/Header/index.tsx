import { Brightness7 } from "@mui/icons-material";
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Avatar, Box, Grid, IconButton, Toolbar, Tooltip, Typography, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { openDrawer } from "../../../reducers/LayoutReducer";
import { selectProfile } from '../../../reducers/ProfileReducer';
import { changeTheme } from '../../../reducers/SettingReducer';



function Header(props: any) {
    const { data } = useSelector(selectProfile);
    const dispatch = useDispatch();

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const handleButtonMenu = () => {
        dispatch(openDrawer(true));
    }
    const handleButtonTheme = () => {
        dispatch(changeTheme(null));
    }

    return (
        <AppBar>
            <Toolbar>
                <Grid spacing={3} container>
                    <Grid
                        xl={2}
                        lg={2}
                        md={2}
                        xs={5}
                        display="flex"
                        alignItems='center'
                        justifyContent="space-between"
                        item
                    >
                        <Box display={isMobile ? 'block' : 'none'}>
                            <IconButton onClick={handleButtonMenu} style={{ paddingLeft: 0 }}>
                                <MenuIcon />
                            </IconButton>
                        </Box>
                        <Typography fontWeight="bold" variant="h6" component="div">
                            DASHBOARD
                        </Typography>
                    </Grid>
                    <Grid xl={8} lg={7} md={7} xs={1} item></Grid>
                    <Grid
                        xl={2}
                        lg={3}
                        md={3}
                        xs={6}
                        display="flex"
                        alignItems='center'
                        justifyContent={isMobile ? "flex-end" : "space-around"}
                        item
                    >
                        <Box>
                            <Tooltip title="theme">
                                <IconButton onClick={handleButtonTheme}>
                                    <Brightness7 sx={{ color: 'primary.main' }} />
                                </IconButton>
                            </Tooltip>
                        </Box>
                        <Typography
                            fontSize="16px"
                            fontWeight="bold"
                            noWrap
                        >
                            {data?.name}
                        </Typography>
                        <Avatar alt='avatar' src={data?.image} />
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar >
    )
}

export default React.memo(Header);