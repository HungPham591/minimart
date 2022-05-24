import { Container } from "@mui/system";
import React from "react";
import ScrollTopButton from "../atoms/ScrollTopButton";
import Footer from "../organisms/Footer";

interface IPageTemplateProp {
    Header?: any;
    Drawer?: any;
    Body?: any;
    children?: any;
}

export default function PageTemplate(props: IPageTemplateProp) {
    const { Header, Drawer, Body, children } = props;
    return (
        <div>
            <Header />
            <Drawer />
            <Body>{children}</Body>
            <Footer></Footer>
            <div style={{ position: 'fixed', bottom: 10, right: 10 }}>
                <ScrollTopButton></ScrollTopButton>
            </div>
        </div>
    );
}