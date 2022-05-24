
import { Container } from "@mui/system";
import React from "react";

interface IBodyProp {
    children?: any;
    imageSrc?: string;
}

const styles = {
    root: {
        width: '100%',
        minHeight: '100vh',
        paddingBottom: '20px',
        backgroundColor: '#FAFAFA'
    }
}

export default function Body(props: IBodyProp) {
    return (
        <div style={styles.root}>
            {props.children}
        </div>
    );
}
