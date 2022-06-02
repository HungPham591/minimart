
import { Delete, Edit, Visibility } from '@mui/icons-material';
import { Box, Chip, Grid, IconButton } from '@mui/material';
import { Container } from '@mui/system';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategoryRequest } from '../../actions/CategoryAction';
import { addProductRequest, fetchProductRequest, updateProductRequest } from '../../actions/ProductAction';
import CustomImage from '../../Atomic/atoms/Image';
import ContentPanel from '../../Atomic/organisms/ContentPanel';
import DeleteProductModal from '../../Atomic/organisms/DeleteProductModal';
import ProductDialog from '../../Atomic/organisms/ProductDialog';
import SearchPanel from '../../Atomic/organisms/ProductSearchPanel';
import TitlePanel from '../../Atomic/organisms/TitlePanel';
import Constants from '../../constants/Constants';
import { selectCategory } from '../../reducers/CategoryReducer';
import { openDeleteProductModal, openProductModal } from '../../reducers/LayoutReducer';
import { selectProduct, sortProduct } from '../../reducers/ProductReducer';



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
const tableHeadAlign = [
    "left",
    "left",
    "left",
    "center",
    "left",
    "left",
    "left",
    "center",
    "center"
]

const tableCellMinWidth = [
    "0px",
    "100px",
    "100px",
    "200px",
    "200px",
    "0px",
    "0px",
    "0px",
    "200px",
]

function ProductPage(props: any) {
    const { data: dataProduct, loading } = useSelector(selectProduct);
    const { data: dataCategory } = useSelector(selectCategory);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCategoryRequest(true));
        dispatch(fetchProductRequest(true));
    }, []);

    const handleSortButton = useCallback((data: any) => {
        dispatch(sortProduct(data));
    }, []);
    const handleOpenCreateButton = useCallback(() => {
        dispatch(openProductModal({ data: null, openModalTo: Constants.OpenModalTo.CREATE }));
    }, []);
    const handleOpenInfoButton = useCallback((data: any) => {
        dispatch(openProductModal({ data, openModalTo: Constants.OpenModalTo.VIEW }));
    }, []);
    const handleOpenUpdateButton = useCallback((data: any) => {
        dispatch(openProductModal({ data, openModalTo: Constants.OpenModalTo.UPDATE }));
    }, []);
    const handleOpenDeleteButton = useCallback((data: any) => {
        dispatch(openDeleteProductModal({ data }));
    }, []);

    const handleConfirmButton = useCallback((data: any, openModalTo: string) => {
        switch (openModalTo) {
            case Constants.OpenModalTo.CREATE: dispatch(addProductRequest(data)); break;
            case Constants.OpenModalTo.UPDATE: dispatch(updateProductRequest(data)); break;
        }
    }, []);

    const convertDataIntoTable = () => {
        return dataProduct?.map((value: any, index: any) => {
            const tempValue = { ...value };
            tempValue.category = dataCategory.find((element: any) => element.id === tempValue.category)?.name;
            tempValue.image = <CustomImage src={tempValue?.image} />
            tempValue.status = tempValue?.status ? <Chip label="Còn hàng" style={{ borderColor: "#1a73e8", color: "#1a73e8" }} variant="outlined" /> : <Chip label="Hết hàng" style={{ borderColor: "#FF385C", color: "#FF385C" }} variant="outlined" />;
            const valueArray: Array<any> = Object.values(tempValue);
            valueArray.shift();
            valueArray.unshift(index + 1);
            valueArray.push(
                <Box display="flex" justifyContent="space-between" minWidth="180px">
                    <IconButton onClick={() => handleOpenInfoButton(value)} size="medium" edge="start" color="inherit" aria-label="menu" >
                        <Visibility />
                    </IconButton>
                    <IconButton onClick={() => handleOpenUpdateButton(value)} size="medium" edge="start" color="inherit" aria-label="menu" >
                        <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleOpenDeleteButton(value)} size="medium" edge="start" color="inherit" aria-label="menu">
                        <Delete />
                    </IconButton>
                </Box>
            );
            return valueArray;
        })
    }

    return (
        <React.Fragment>
            <ProductDialog handleConfirmButton={handleConfirmButton} />
            <DeleteProductModal />
            <TitlePanel title="sản phẩm" />
            <Container style={{ paddingTop: "20px", paddingBottom: "20px" }}>
                <SearchPanel handleSortButton={handleSortButton} searchLabel="sản phẩm" />
            </Container>
            <Grid container>
                <ContentPanel tableHeadAlign={tableHeadAlign} tableCellMinWidth={tableCellMinWidth} loading={loading} title="SẢN PHẨM" tableTitle={title} tableData={convertDataIntoTable()} handleOpenCreateButton={handleOpenCreateButton} handleOpenInfoButton={handleOpenInfoButton} handleOpenUpdateButton={handleOpenUpdateButton} handleOpenDeleteButton={handleOpenDeleteButton}></ContentPanel>
            </Grid>
        </React.Fragment>
    );
}

export default React.memo(ProductPage);