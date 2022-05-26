import { Button, Container, Typography } from "@mui/material";
import { withStyles } from "@mui/styles";
import React from "react";
import Typewritter from 'typewriter-effect';

const styles = {
    root: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        paddingTop: "140px",
        paddingBottom: "140px",
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
        marginTop: "10px",
    }
};

function TitlePanel(props: any) {
    return (
        <div id="title-panel" className={props.classes.root}>
            <Container>
                <Typography variant="h3" component="h2" fontWeight="bold" color={'white'}>
                    Danh sách
                    <span>
                        <Typewritter onInit={(typewritter) => {
                            typewritter.typeString(`danh mục các ${props?.title}`).pauseFor(2000).deleteAll().typeString(`danh mục các ${props?.title}`).start();
                        }} />
                    </span>
                </Typography>
                <p className={props.classes.text}>Đăng nhập vào tài khoản admin để có thể chỉnh sửa dữ liệu</p>
                <Button style={styles.signingButton} variant="contained" color="error" >ĐĂNG NHẬP / ĐĂNG KÝ</Button>
            </Container>
        </div>
    )
}

export default withStyles(styles)(TitlePanel);