import { Box, Container, Pagination, Paper, Typography, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import Constants from "../../../constants/Constants";
import CustomTable from "../../molecules/Table";

function ContentPanel(props: any) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const [page, setPage] = useState(1);

    useEffect(() => {
        if (props?.tableData && props?.tableData?.length > 0) {
            const numberOfPage = getNumberOfPage();
            if (page > numberOfPage) setPage(numberOfPage);
            console.log(page)
        }
    }, [props?.tableData]);

    const handlePagination = (e: any, page: number) => {
        setPage(page);
    }

    const convertDataIntoTable = (data: Array<any>) => {
        return data.map((value, index) => {
            if (index + 1 < (page - 1) * Constants.SIZE_PER_PAGE + 1 || index + 1 > page * Constants.SIZE_PER_PAGE) return [];
            return value;
        })
    }
    const getNumberOfPage = (): number => {
        return Math.ceil(props?.tableData.length / Constants.SIZE_PER_PAGE);
    }


    return (
        <Container maxWidth={false}>
            <Paper style={{ overflowX: "auto" }}>
                <Box padding="15px 30px">
                    <Box paddingBottom="20px" paddingTop="10px" display="flex" justifyContent='space-between' >
                        <Typography variant="h6" fontWeight={"bold"}>{props?.title}</Typography>
                        <Typography fontSize="18px" fontWeight="600">số lượng: {props?.loading ? "" : props?.tableData?.length}</Typography>
                    </Box>
                    <CustomTable
                        tableHeadAlign={props?.tableHeadAlign}
                        tableCellMinWidth={props?.tableCellMinWidth}
                        loading={props?.loading ? 1 : 0}
                        header={props?.tableTitle}
                        value={convertDataIntoTable(props?.tableData)}
                    />
                    <Box paddingTop="20px" display="flex" justifyContent={isMobile ? "space-around" : "right"}>
                        <Pagination count={getNumberOfPage()} page={page} onChange={handlePagination} />
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
}
export default React.memo(ContentPanel);