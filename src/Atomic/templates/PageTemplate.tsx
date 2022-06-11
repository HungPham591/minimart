import { Box, LinearProgress, styled, Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { useSelector } from "react-redux";
import Constants from "../../constants/Constants";
import { selectLayout } from "../../reducers/LayoutReducer";

interface IPageTemplateProp {
    Header?: any;
    Drawer?: any;
    Body?: any;
    children?: any;
}
const useStyles = makeStyles((theme: Theme) => ({
    drawerOpen: {
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        [theme.breakpoints.up("md")]: {
            marginLeft: Constants.DRAWER_WIDTH,
            width: `calc(100% - ${Constants.DRAWER_WIDTH}px)`
        }
    },
    drawerClose: {
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        [theme.breakpoints.up('md')]: {
            marginLeft: `calc(${theme.spacing(7)} + 10px)`,
        }
    }
}))


function PageTemplate(props: IPageTemplateProp) {
    const { drawerOpen } = useSelector(selectLayout);
    const classes = useStyles();
    const { Header, Drawer, Body } = props;
    const { navigating } = useSelector(selectLayout);

    return (
        <Box flex={1} paddingBottom='40px' minHeight={"100vh"} bgcolor="#F0F2F5">
            <Box>
                <Drawer />
            </Box>
            <Box className={drawerOpen ? classes.drawerOpen : classes.drawerClose} component="main" sx={{ flexGrow: 1 }}>
                <LinearProgress style={navigating ? { display: 'block', position: "fixed", top: 0, right: 0, left: 0 } : { display: 'none' }} />
                <Header />
                {Body}
            </Box>
            {/* <Box display={isMobile ? "block" : "none"}>
                <BottomNavigationBar />
            </Box> */}
        </Box>
    );
}
export default React.memo(PageTemplate);