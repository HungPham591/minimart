import { Box, LinearProgress, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { selectLayout } from "../../reducers/LayoutReducer";
import CustomScrollTopButton from "../atoms/ScrollTopButton";
import BottomNavigationBar from '../organisms/BottonNavigationBar';

interface IPageTemplateProp {
    Header?: any;
    Drawer?: any;
    Body?: any;
    children?: any;
}
function PageTemplate(props: IPageTemplateProp) {
    const { Header, Drawer, Body } = props;
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const { navigating } = useSelector(selectLayout);

    return (
        <Box component="main" flex={1} paddingBottom='50px' bgcolor="#F0F2F5">
            <Box display={isMobile ? "none" : "block"}>
                <Drawer />
            </Box>
            <Box style={isMobile ? { paddingBottom: "20px" } : {
                paddingLeft: `calc(${theme.spacing(7)} + 1px)`,
                [theme.breakpoints.up('sm')]: {
                    width: `calc(${theme.spacing(8)} + 1px)`,
                }
            }}>
                <LinearProgress style={navigating ? { display: 'block' } : { display: 'none' }} />
                <Header />
                {Body}
            </Box>
            <Box display={isMobile ? "block" : "none"}>
                <BottomNavigationBar />
            </Box>
            <Box display={isMobile ? "none" : "block"} position="fixed" bottom={10} right={10}>
                <CustomScrollTopButton></CustomScrollTopButton>
            </Box>
        </Box>
    );
}
export default React.memo(PageTemplate);