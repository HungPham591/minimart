
import { Paper, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import CustomTextSkeleton from "../../atoms/TextSkeleton";

interface ITableProp {
    header: Array<string>;
    value: Array<Array<any>>;
    // classes: any;
    loading: any;
}


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

function CustomTable(props: ITableProp) {
    const tableHead = () => {
        return props?.header.map((value, index) => (
            <StyledTableCell key={index}><Typography fontSize="15px" whiteSpace="nowrap" fontWeight="bold">{value}</Typography></StyledTableCell>
        ));
    }
    const tableSkeletonLoading = () => {
        const arrayElement = Array();
        for (let i = 1; i <= 5; i++) {
            arrayElement.push(
                <TableRow key={i}>
                    {
                        props?.header.map((value, index) => (
                            <TableCell key={index}><CustomTextSkeleton /></TableCell>
                        ))
                    }
                </TableRow>
            )
        }
        return arrayElement;
    }
    const tableData = () => {
        return props?.value.map((value, index) => (
            <StyledTableRow key={index}>
                {
                    value.map((value, index) => (
                        <TableCell key={index}>
                            <Box fontWeight={index === 0 ? "bold" : "normal"} minHeight="100px" maxHeight="150px" minWidth="50px" maxWidth="500px" overflow="hidden" textOverflow="ellipsis">
                                {value}
                            </Box>
                        </TableCell>
                    ))
                }
            </StyledTableRow>
        ))
    }
    return (
        <TableContainer {...props} component={Paper}>
            <Table stickyHeader>
                <TableHead>
                    <TableRow>
                        {tableHead()}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        props?.loading ? tableSkeletonLoading() : tableData()
                    }
                </TableBody>
            </Table>
        </TableContainer>
    )
}
export default React.memo(CustomTable);