import { Delete, Edit, Visibility } from '@mui/icons-material';
import { Container, IconButton, Paper, styled } from "@mui/material";
import { withStyles } from "@mui/styles";
import * as _ from "lodash";
import React, { useState } from "react";
import Constants from '../../../../../constants/constants';
import Button from "../../atoms/Button";
import ClientImage from '../../atoms/Image';
import Pagination from "../../atoms/Pagination";
import TableData from "../../atoms/Table";

const styles = {
    root: {
        padding: "15px 20px",
    },
    searchPanel: {
        display: 'flex' as 'flex',
        justifyContent: 'space-between' as "space-between",
    },
    paginationPanel: {
        float: 'right' as "right",
    }
};

function ContentPanel(props: any) {
    const [page, setPage] = useState(1);

    const handlePagination = (e: any, page: number) => {
        setPage(page);
    }

    const convertDataIntoTable = (data: Array<any>) => {
        return data.map((value, index) => {
            if (index + 1 < (page - 1) * Constants.SIZE_PER_PAGE + 1 || index + 1 > page * Constants.SIZE_PER_PAGE) return [];
            const keyArray = _.keys(value);
            const imageIndex = keyArray.findIndex((element) => {
                return element === "image";
            })
            const valueArray: Array<any> = _.values(value);
            valueArray[imageIndex] = <ClientImage src={value.image} />;
            valueArray.shift();
            valueArray.unshift(index + 1);
            valueArray.push(
                <div style={{ display: 'flex' }}>
                    <IconButton onClick={() => props?.handleOpenInfoButton(value)} size="medium" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                        <Visibility />
                    </IconButton>
                    <IconButton onClick={() => props?.handleOpenUpdateButton(value)} size="medium" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                        <Edit />
                    </IconButton>
                    <IconButton onClick={() => props?.handleOpenDeleteButton(value)} size="medium" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                        <Delete />
                    </IconButton>
                </div>
            );
            return valueArray;
        })
    }
    const getNumberOfPage = (): number => {
        return Math.round(props?.tableData.length / Constants.SIZE_PER_PAGE);
    }

    const TitleRow = styled('div')(({ theme }) => ({
        display: "flex",
        paddingBottom: "10px"
    }));
    const PaginationPanel = styled('div')(({ theme }) => ({
        paddingTop: "20px",
        display: "flex",
        justifyContent: "right"
    }));

    return (
        <Container>
            <Paper elevation={4}>
                <Container style={styles.root}>
                    <TitleRow style={styles.searchPanel}>
                        <h3>{props?.title}: {props?.tableData?.length}</h3>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <Button title="Thêm" variant="contained" onClick={props?.handleOpenCreateButton}></Button>
                        </div>
                    </TitleRow>
                    <TableData header={props?.tableTitle} value={convertDataIntoTable(props?.tableData)} />
                    <PaginationPanel>
                        <Pagination count={getNumberOfPage()} page={page} onChange={handlePagination} />
                    </PaginationPanel>
                </Container>
            </Paper>
        </Container>
    );
}
export default withStyles(styles)(ContentPanel);