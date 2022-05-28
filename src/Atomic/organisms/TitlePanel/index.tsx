import { Box, Container, Typography } from "@mui/material";
import React from "react";
import Typewritter from 'typewriter-effect';



function TitlePanel(props: any) {
    return (
        <Box display="flex" alignItems="center" justifyContent="space-between" paddingY="140px" bgcolor="#003580">
            <Container>
                <Typography variant="h3" component="h2" fontWeight="bold" color={'white'}>
                    Danh sách
                    <span>
                        <Typewritter onInit={(typewritter) => {
                            typewritter.typeString(`danh mục các ${props?.title}`).pauseFor(2000).deleteAll().typeString(`danh mục các ${props?.title}`).start();
                        }} />
                    </span>
                </Typography>
                {/* <p className={classes.text}>Đăng nhập vào tài khoản admin để có thể chỉnh sửa dữ liệu</p>
                <Button size="large" sx={{ paddingY: "15px" }} variant="contained">ĐĂNG NHẬP / ĐĂNG KÝ</Button> */}
            </Container>
        </Box>
    )
}

export default React.memo(TitlePanel);