import { Button, Container } from "@mui/material";
import { withStyles } from "@mui/styles";
import React from "react";
import Title from "../../atoms/Title";


const styles = {
    root: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        paddingTop: "160px",
        paddingBottom: "160px",
        backgroundColor: '#003580'
    },
    text: {
        color: "white",
        fontWeight: "400",
        fontSize: "26px"
    },
    signingButton: {
        fontSize: "14px",
        fontWeight: "bold",
        padding: "15px 30px",
        marginTop: "10px"
    }
};

function TitlePanel(props: any) {
    const title = `Danh sách danh mục các ${props?.title}`;
    return (
        <div className={props.classes.root}>
            <Container>
                <Title value={title} color={'white'} />
                <p className={props.classes.text}>Đăng nhập vào tài khoản admin để có thể chỉnh sửa dữ liệu</p>
                <Button style={styles.signingButton} variant="contained" color="error" >ĐĂNG NHẬP / ĐĂNG KÝ</Button>
            </Container>
        </div>
    )
}

export default withStyles(styles)(TitlePanel);