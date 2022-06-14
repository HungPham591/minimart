
import { Delete, Edit, Visibility } from '@mui/icons-material';
import { Box, Chip, Grid, IconButton, Typography } from '@mui/material';
import { Container } from '@mui/system';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategoryRequest } from '../../actions/CategoryAction';
import { fetchProductRequest } from '../../actions/ProductAction';
import CustomImage from '../../Atomic/atoms/Image';
import ConfirmDialog from '../../Atomic/organisms/ConfirmDialog';
import ContentPanel from '../../Atomic/organisms/ContentPanel';
import ProductDialog from '../../Atomic/organisms/ProductDialog';
import SearchPanel from '../../Atomic/organisms/ProductSearchPanel';
import ProductViewDialog from '../../Atomic/organisms/ProductViewDialog';
import TitlePanel from '../../Atomic/organisms/TitlePanel';
import Constants from '../../constants/Constants';
import { selectCategory } from '../../reducers/CategoryReducer';
import { openConfirmModal, openModal, setDataConfirm, setDataModal } from '../../reducers/LayoutReducer';
import { selectProduct, sortProduct } from '../../reducers/ProductReducer';



const title = [
    'STT',
    'ID',
    'Tên',
    'Danh mục',
    'Hình ảnh',
    'Mô tả',
    'Số lượng',
    'Khối lượng',
    'Trạng thái',
    'Thao tác',
];
const tableHeadAlign = [
    "left",
    "left",
    "left",
    "left",
    "center",
    "left",
    "right",
    "right",
    "center",
    "center"
]

const tableCellMinWidth = [
    "0px",
    "0px",
    "100px",
    "100px",
    "200px",
    "200px",
    "100px",
    "100px",
    "200px",
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
    const handleCreateButton = useCallback(() => {
        dispatch(setDataModal({ data: null }));
        dispatch(openModal({ modalOpen: Constants.modalOpen.PRODUCT, openModalTo: Constants.OpenModalTo.CREATE }));
    }, [])
    const handleViewButton = useCallback((data: any) => {
        dispatch(setDataModal({ data }));
        dispatch(openModal({ modalOpen: Constants.modalOpen.PRODUCT, openModalTo: Constants.OpenModalTo.VIEW }));
    }, [])
    const handleUpdateButton = useCallback((data: any) => {
        dispatch(setDataModal({ data }));
        dispatch(openModal({ modalOpen: Constants.modalOpen.PRODUCT, openModalTo: Constants.OpenModalTo.UPDATE }));
    }, [])
    const handleDeleteButton = useCallback((data: any) => {
        dispatch(setDataConfirm(data));
        dispatch(openConfirmModal(Constants.needToConfirm.DELETE_PRODUCT));
    }, [])

    const convertDataIntoTable = () => {
        return dataProduct?.map((value: any, index: any) => {
            const tempValue = { ...value };
            tempValue.id = <Typography noWrap maxWidth={"50px"}>{tempValue.id}</Typography>
            tempValue.category = dataCategory.find((element: any) => element.id === tempValue.category)?.name;
            tempValue.image = (<Box width={"200px"} height={"150px"}><CustomImage src={tempValue?.image} /></Box>)
            tempValue.status = tempValue?.status ? <Chip label="Còn hàng" style={{ borderColor: "#1a73e8", color: "#1a73e8" }} variant="outlined" /> : <Chip label="Hết hàng" style={{ borderColor: "#FF385C", color: "#FF385C" }} variant="outlined" />;
            const valueArray: Array<any> = Object.values(tempValue);
            // valueArray.shift();
            valueArray.unshift(index + 1);
            valueArray.push(
                <Box display="flex" justifyContent="space-between" margin={"auto"} width={"200px"}>
                    <IconButton
                        onClick={() => handleViewButton(value)}
                        size="medium"
                        color="inherit"
                        aria-label="menu"
                    >
                        <Visibility />
                    </IconButton>
                    <IconButton
                        onClick={() => handleUpdateButton(value)}
                        size="medium"
                        color="inherit"
                        aria-label="menu"
                    >
                        <Edit />
                    </IconButton>
                    <IconButton
                        onClick={() => handleDeleteButton(value)}
                        size="medium"
                        color="inherit"
                        aria-label="menu"
                    >
                        <Delete />
                    </IconButton>
                </Box>
            );
            return valueArray;
        })
    }

    return (
        <React.Fragment>
            <ProductViewDialog />
            <ProductDialog />
            <ConfirmDialog />
            <TitlePanel title="sản phẩm" handleCreateButton={handleCreateButton} />
            <Container maxWidth={false} style={{ paddingTop: "20px", paddingBottom: "20px" }}>
                <SearchPanel handleSortButton={handleSortButton} searchLabel="sản phẩm" />
            </Container>
            <Grid container>
                <ContentPanel
                    tableHeadAlign={tableHeadAlign}
                    tableCellMinWidth={tableCellMinWidth}
                    loading={loading}
                    title="SẢN PHẨM"
                    tableTitle={title}
                    tableData={convertDataIntoTable()}
                />
            </Grid>
        </React.Fragment>
    );
}

export default React.memo(ProductPage);