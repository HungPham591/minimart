
import { Paper } from '@mui/material';
import { withStyles } from '@mui/styles';
import { Container } from '@mui/system';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCategoryRequest, fetchCategoryRequest, removeCategoryRequest, updateCategoryRequest } from '../../../actions/category.action';
import Constants from '../../../constants/constants';
import { selectCategory, sortCategory } from '../../../reducers/category.reducer';
import { closeConfirmModal, openCategoryModal, openConfirmCategoryModal, selectLayout } from '../../../reducers/layout.reducer';
import CategoryDialog from '../Atomic/organisms/CategoryDialog';
import ConfirmDialog from '../Atomic/organisms/ConfirmDialog';
import ContentPanel from '../Atomic/organisms/ContentPanel';
import SearchPanel from '../Atomic/organisms/SearchPanel';
import TitlePanel from '../Atomic/organisms/TitlePanel';

const styles = {
    searchPanel: {
        position: "relative" as "relative",
        top: -40
    },
    searchPaper: {
        // backgroundColor: "#FEBB02",
        paddingTop: "5px",
        paddingBottom: "5px",
        borderStyle: "solid" as "solid",
        borderColor: "#FEBB02",
        borderWidth: "5px",
    }
}

const title = [
    'STT',
    'Tên',
    'Miêu tả',
    'Thao tác',
];


function CategoryPage(props: any) {
    const { data, loading } = useSelector(selectCategory);
    const { openModalTo, dataCategoryModal } = useSelector(selectLayout);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCategoryRequest(true));
    }, []);

    const handleSortButton = (data: any) => {
        dispatch(sortCategory(data));
    }
    const handleOpenCreateButton = () => {
        dispatch(openCategoryModal({ data: null, openModalTo: Constants.OpenModalTo.CREATE }));
    }
    const handleOpenInfoButton = (data: any) => {
        dispatch(openCategoryModal({ data, openModalTo: Constants.OpenModalTo.VIEW }));
    }
    const handleOpenUpdateButton = (data: any) => {
        dispatch(openCategoryModal({ data, openModalTo: Constants.OpenModalTo.UPDATE }));
    }
    const handleOpenDeleteButton = (data: any) => {
        dispatch(openConfirmCategoryModal({ data }));
    }
    const handleDeleteButton = () => {
        const data = { ...dataCategoryModal };
        dispatch(removeCategoryRequest(data));
        dispatch(closeConfirmModal(true));
    }
    const handleCloseButton = () => {
        dispatch(closeConfirmModal(true));
    }
    const handleConfirmButton = (data: any) => {
        if (!openModalTo) return;
        switch (openModalTo) {
            case Constants.OpenModalTo.CREATE: dispatch(addCategoryRequest(data)); break;
            case Constants.OpenModalTo.UPDATE: dispatch(updateCategoryRequest(data)); break;
        }
    }

    return (
        <React.Fragment>
            <CategoryDialog handleConfirmButton={handleConfirmButton}></CategoryDialog>
            <ConfirmDialog handleConfirmButton={handleDeleteButton} title="Bạn có thật sự muốn xóa sản phẩm?" handleCloseButton={handleCloseButton} ></ConfirmDialog>
            <TitlePanel title="danh mục sản phẩm"></TitlePanel>
            <Container className={props.classes.searchPanel}>
                <Paper className={props.classes.searchPaper}>
                    <SearchPanel handleSortButton={handleSortButton} searchLabel="danh mục sản phẩm"></SearchPanel>
                </Paper>
            </Container>
            <ContentPanel loading={loading} title="DANH MỤC SẢN PHẨM" tableTitle={title} tableData={data} handleOpenCreateButton={handleOpenCreateButton} handleOpenInfoButton={handleOpenInfoButton} handleOpenUpdateButton={handleOpenUpdateButton} handleOpenDeleteButton={handleOpenDeleteButton}></ContentPanel>
        </React.Fragment>
    );
}

export default withStyles(styles)(CategoryPage);