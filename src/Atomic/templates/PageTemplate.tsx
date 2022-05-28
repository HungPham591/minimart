import { Box } from "@mui/material";
import React from "react";
import CustomScrollTopButton from "../atoms/ScrollTopButton";

interface IPageTemplateProp {
    Header?: any;
    Drawer?: any;
    Body?: any;
    children?: any;
}
function PageTemplate(props: IPageTemplateProp) {
    const { Header, Drawer, Body } = props;
    return (
        <>
            <Header />
            <Drawer />
            <Box width='100%' minHeight='100vh' paddingBottom='50px' bgcolor="#FAFAFA">
                {Body}
            </Box>
            {/* <Footer></Footer> */}
            <Box position="fixed" bottom={10} right={10}>
                <CustomScrollTopButton></CustomScrollTopButton>
            </Box>
        </>
    );
}
export default React.memo(PageTemplate);