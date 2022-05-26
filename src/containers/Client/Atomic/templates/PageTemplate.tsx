import { styled } from "@mui/styles";
import React from "react";
import ScrollTopButton from "../atoms/ScrollTopButton";

interface IPageTemplateProp {
    Header?: any;
    Drawer?: any;
    Body?: any;
    children?: any;
}

export default function PageTemplate(props: IPageTemplateProp) {
    const { Header, Drawer, Body } = props;
    const BodyPanel = styled('div')(() => ({
        width: '100%',
        minHeight: '100vh',
        paddingBottom: '50px',
        backgroundColor: '#FAFAFA'
    }))
    return (
        <>
            <Header />
            <Drawer />
            <BodyPanel>{Body}</BodyPanel>
            {/* <Footer></Footer> */}
            <div style={{ position: 'fixed', bottom: 10, right: 10 }}>
                <ScrollTopButton></ScrollTopButton>
            </div>
        </>
    );
}