
import { Grid, Paper, Skeleton, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));
//if mobile cell display block and table header display none
function CustomTable(props: any) {
    const { tableHeadAlign, tableCellMinWidth, ...rest } = props;
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const tableHead = () => {
        return props?.header.map((value: any, index: any) => (
            <StyledTableCell align={props?.tableHeadAlign[index]} key={index}><Typography fontSize="15px" noWrap fontWeight="bold">{value}</Typography></StyledTableCell>
        ));
    }
    const tableSkeletonLoading = () => {
        const arrayElement = Array();
        for (let i = 1; i <= 5; i++) {
            if (isMobile) {
                arrayElement.push(
                    <TableRow key={i}>
                        <TableCell>
                            <Skeleton variant="text" animation="wave" />
                        </TableCell>
                    </TableRow>
                )
            } else {
                arrayElement.push(
                    <TableRow key={i}>
                        {
                            props?.header.map((value: any, index: any) => (
                                <TableCell key={index}><Skeleton variant="text" animation="wave" /></TableCell>
                            ))
                        }
                    </TableRow>
                )
            }
        }
        return arrayElement;
    }
    const tableData = () => {
        return props?.value.map((value: any, index: any) => (
            <StyledTableRow key={index}>
                {
                    value?.map((value: any, index: any) => (
                        <TableCell style={isMobile ? { display: "inline" } : { display: "table-cell" }} key={index}>
                            <Box
                                style={isMobile ? { padding: "0 15px" } : { minWidth: props?.tableCellMinWidth[index] }}
                                fontWeight={index === 0 ? "bold" : "normal"}
                            >
                                <Grid display={"flex"} justifyContent="space-between" container>
                                    <Grid style={{ display: isMobile ? "inline" : "none" }} item>
                                        <Typography fontWeight="bold">
                                            {props?.header[index]}:
                                        </Typography>
                                    </Grid>
                                    <Grid lg={12} md={12} item>
                                        {value}
                                    </Grid>
                                </Grid>
                            </Box>
                        </TableCell>
                    ))
                }
            </StyledTableRow>
        ))
    }
    return (
        <TableContainer id="table" style={{ overflowY: "hidden" }} {...rest} component={Paper}>
            <Table stickyHeader>
                <TableHead style={{ display: isMobile ? "none" : "table-header-group" }}>
                    <TableRow>
                        {tableHead()}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        props?.loading ? tableSkeletonLoading() : tableData()
                    }
                    {
                        props?.value?.length === 0 && !props?.loading ?
                            <TableRow>
                                <TableCell colSpan={props?.header?.length}>
                                    <Typography align="center">No data!!!</Typography>
                                </TableCell>
                            </TableRow>
                            :
                            <></>
                    }
                </TableBody>
            </Table>
        </TableContainer>
    )
}
export default React.memo(CustomTable);

