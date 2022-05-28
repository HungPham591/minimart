
import { Button, Container, Grid, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';

// const useStyles = makeStyles({
//     root: {
//         backgroundColor: "#00224F",
//         color: "white",
//         padding: "40px 0"
//     },
//     title: {

//     },
//     inputPanel: {
//         margin: 0,
//         paddingTop: "30px",
//         maxWidth: "600px"
//     },
//     infoPanel: {
//         padding: "40px 0 90px 0"
//     },
//     titleInfo: {
//         fontWeight: "bold",
//         fontSize: "22px",
//         padding: "8px 0"
//     }
// })
const Support = [
    'Hỗ trợ',
    'Thông tin an toàn',
    'Hỗ trợ người khuyết tật',
    'Các tùy chọn hủy',
    'Biện pháp ứng phó với COVID-19 của chúng tôi',
    'Báp cáo lo ngại của hàng xóm'
];
const Community = [
    'Cộng đồng',
    'Nhà cứu trợ',
    'Hỗ trợ dân tị nạn Afghanistan',
    'Chống phân biệt đối xử',
]
const Welcome = [
    'Đón tiếp khách',
    'Cover chủ nhà',
    'Xem tài nguyên đón tiếp khách',
    'Truy cập diễn đàn cộng đồng',
    'Đón tiếp khách có trách nhiệm',
];
const Introduce = [
    'Giới thiệu',
    'Tìm hiểu các chức năng mới',
    'Thư ngỏ từ các nhà sáng lập',
    'Cơ hội nghề nghiệp',
    'Nhà đầu tư'
]


function Footer(props: any) {
    return (
        <>
            {/* <Container maxWidth={false} className={classes.root}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                    <h2 >Tiết kiệm thời gian và tiền bạc!</h2>
                    <h3 >Hãy đăng ký và chúng tôi sẽ gửi những ưu đãi tốt nhất cho bạn</h3>
                    <Grid className={classes.inputPanel} spacing={2} container>
                        <Grid lg={9} md={12} sm={12} xs={12} item>
                            <TextField fullWidth={true} style={{ backgroundColor: 'white' }}></TextField>
                        </Grid>
                        <Grid lg={3} md={12} sm={12} xs={12} item>
                            <Button variant='contained' fullWidth={true} style={{ height: '100%' }}>ĐĂNG KÝ</Button>
                        </Grid>
                    </Grid>
                </div>
            </Container>
            <Container className={classes.infoPanel}>
                <Grid container>
                    <Grid lg={3} md={12} xs={12} item>
                        {
                            Support.map((value, index) => {
                                if (index === 0)
                                    return <p className={classes.titleInfo} key={index}>{value}</p>
                                else
                                    return <p key={index}>{value}</p>
                            })
                        }
                    </Grid>
                    <Grid lg={3} md={12} xs={12} item>
                        {
                            Community.map((value, index) => {
                                if (index === 0)
                                    return <p className={classes.titleInfo} key={index}>{value}</p>
                                else
                                    return <p key={index}>{value}</p>
                            })
                        }
                    </Grid>
                    <Grid lg={3} md={12} xs={12} item>
                        {
                            Welcome.map((value, index) => {
                                if (index === 0)
                                    return <p className={classes.titleInfo} key={index}>{value}</p>
                                else
                                    return <p key={index}>{value}</p>
                            })
                        }
                    </Grid>
                    <Grid lg={3} md={12} xs={12} item>
                        {
                            Introduce.map((value, index) => {
                                if (index === 0)
                                    return <p className={classes.titleInfo} key={index}>{value}</p>
                                else
                                    return <p key={index}>{value}</p>
                            })
                        }
                    </Grid>
                </Grid>
            </Container> */}
        </>
    )
}

export default React.memo(Footer);