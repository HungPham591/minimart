
import { Paper, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow } from "@mui/material";
import { withStyles } from "@mui/styles";
import React from "react";
import TextSkeleton from "../../atoms/TextSkeleton";

interface ITableProp {
    header: Array<string>;
    value: Array<Array<any>>;
    classes: any;
    loading: boolean;
}

const styles = {
    cell: {
        // whiteSpace: "nowrap" as "nowrap",
        minHeight: "100px",
        maxHeight: "150px",
        minWidth: "50px",
        maxWidth: "300px",
        overflow: "hidden" as "hidden",
        textOverflow: "ellipsis" as "ellipsis",
    }
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

function TableData(props: ITableProp) {
    const tableHead = () => {
        return props?.header.map((value, index) => (
            <StyledTableCell key={index}><b>{value}</b></StyledTableCell>
        ));
    }
    const tableSkeletonLoading = () => {
        const arrayElement = Array();
        for (let i = 1; i <= 5; i++) {
            arrayElement.push(
                <TableRow>
                    {
                        props?.header.map((value, index) => (
                            <TableCell key={index}><TextSkeleton /></TableCell>
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
                            <div className={props?.classes?.cell}>
                                {value}
                            </div>
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

export default withStyles(styles)(TableData);