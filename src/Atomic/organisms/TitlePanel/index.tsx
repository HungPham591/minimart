import { Box, Button, Container, Typography, useMediaQuery, useTheme } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import React from "react";
import "./style.scss";

function TitlePanel(props: any) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    return (
        <div id="titlepanel">
            <Box color="white" paddingY="30px" bgcolor="#003580">
                <Container>
                    <Box display="flex" justifyContent="space-between">
                        <Typography maxWidth={isMobile ? "70%" : "50%"} variant="h5" component="h2" fontWeight="bold">
                            Danh sách {props?.title}
                        </Typography>
                        <Box display="flex" alignItems="center">
                            <Button id="addbutton" onClick={props?.handleCreateButton} variant="contained" startIcon={<AddIcon id="addicon" />}>Thêm</Button>
                        </Box>
                    </Box>
                </Container>
            </Box>
        </div>
    )
}

export default React.memo(TitlePanel);