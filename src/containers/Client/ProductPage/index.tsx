
import { Paper } from '@mui/material';
import { withStyles } from '@mui/styles';
import { Container } from '@mui/system';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProductRequest, fetchProductRequest, removeProductRequest, updateProductRequest } from '../../../actions/product.action';
import Constants from '../../../constants/constants';
import { closeConfirmModal, openConfirmProductModal, openProductModal, selectLayout } from '../../../reducers/layout.reducer';
import { selectProduct, sortProduct } from '../../../reducers/product.reducer';
import ContentPanel from '../Atomic/organisms/ContentPanel';
import ProductDialog from '../Atomic/organisms/ProductDialog';
import SearchPanel from '../Atomic/organisms/SearchPanel';
import TitlePanel from '../Atomic/organisms/TitlePanel';
import ConfirmDialog from '../Atomic/organisms/ConfirmDialog';

const styles = {
    searchPanel: {
        position: "relative" as "relative",
        top: -40
    },
    searchPaper: {
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
    'Danh mục',
    'Hình ảnh',
    'Miêu tả',
    'Số lượng',
    'Khối lượng',
    'Trạng thái',
    'Thao tác',
];


function ProductPage(props: any) {
    const { data, loading } = useSelector(selectProduct);
    const { openModalTo, dataProductModal } = useSelector(selectLayout);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProductRequest(false));
    }, []);

    const handleSortButton = (data: any) => {
        dispatch(sortProduct(data));
    }
    const handleOpenCreateButton = () => {
        dispatch(openProductModal({ data: null, openModalTo: Constants.OpenModalTo.CREATE }));
    }
    const handleOpenInfoButton = (data: any) => {
        dispatch(openProductModal({ data, openModalTo: Constants.OpenModalTo.VIEW }));
    }
    const handleOpenUpdateButton = (data: any) => {
        dispatch(openProductModal({ data, openModalTo: Constants.OpenModalTo.UPDATE }));
    }
    const handleOpenDeleteButton = (data: any) => {
        dispatch(openConfirmProductModal({ data }));
    }
    const handleDeleteButton = () => {
        const data = { ...dataProductModal };
        dispatch(removeProductRequest(data));
        dispatch(closeConfirmModal(true));
    }
    const handleCloseButton = () => {
        dispatch(closeConfirmModal(true));
    }

    const handleConfirmButton = (data: any) => {
        if (!openModalTo) return;
        switch (openModalTo) {
            case Constants.OpenModalTo.CREATE: dispatch(addProductRequest(data)); break;
            case Constants.OpenModalTo.UPDATE: dispatch(updateProductRequest(data)); break;
        }
    }
    return (
        <React.Fragment>
            <ProductDialog handleConfirmButton={handleConfirmButton}></ProductDialog>
            <ConfirmDialog handleConfirmButton={handleDeleteButton} title="Bạn có thật sự muốn xóa sản phẩm?" handleCloseButton={handleCloseButton}></ConfirmDialog>
            <TitlePanel title="sản phẩm"></TitlePanel>
            <Container className={props.classes.searchPanel}>
                <Paper className={props.classes.searchPaper}>
                    <SearchPanel handleSortButton={handleSortButton} searchLabel="sản phẩm"></SearchPanel>
                </Paper>
            </Container>
            <ContentPanel loading={loading} title="SẢN PHẨM" tableTitle={title} tableData={data} handleOpenCreateButton={handleOpenCreateButton} handleOpenInfoButton={handleOpenInfoButton} handleOpenUpdateButton={handleOpenUpdateButton} handleOpenDeleteButton={handleOpenDeleteButton}></ContentPanel>
        </React.Fragment>
    );
}

export default withStyles(styles)(ProductPage);