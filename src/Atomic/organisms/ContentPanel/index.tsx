import { Box, Button, Container, Pagination, Paper } from "@mui/material";
import React, { useState } from "react";
import Constants from "../../../constants/Constants";
import CustomTable from "../../molecules/Table";

function ContentPanel(props: any) {
    const [page, setPage] = useState(1);

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
        <Container>
            <Paper elevation={4}>
                <Box padding="15px 30px">
                    <Box paddingBottom="10px" display="flex" justifyContent='space-between' >
                        <h3>{props?.title}: {props?.loading ? "" : props?.tableData?.length}</h3>
                        <Box display="flex" alignItems="center">
                            <Button variant="contained" onClick={props?.handleOpenCreateButton}>Thêm</Button>
                        </Box>
                    </Box>
                    <CustomTable loading={props?.loading ? 1 : 0} header={props?.tableTitle} value={convertDataIntoTable(props?.tableData)} />
                    <Box paddingTop="20px" display="flex" justifyContent="right">
                        <Pagination count={getNumberOfPage()} page={page} onChange={handlePagination} />
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
}
export default React.memo(ContentPanel);