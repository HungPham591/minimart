import { Icon } from "@mui/material";
import React from "react";

interface IIconProp {
    src: string;
}

export default function SvgIcon(props: IIconProp) {
    return (
        <Icon>
            <img src={props?.src} />
        </Icon>
    );
}