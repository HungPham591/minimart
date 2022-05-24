import React from "react";
import Body from "./Atomic/organisms/Body";
import Drawer from "./Atomic/organisms/Drawer";
import Header from "./Atomic/organisms/Header";
import PageTemplate from "./Atomic/templates/PageTemplate";


export default function ClientContainer(props: any) {
    return <PageTemplate Header={Header} Body={Body} Drawer={Drawer}>{props.children}</PageTemplate>
}