
import { Delete, Edit, Visibility } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import { Container } from '@mui/system';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCategoryRequest, fetchCategoryRequest, updateCategoryRequest } from '../../actions/CategoryAction';
import CategoryDialog from '../../Atomic/organisms/CategoryDialog';
import ContentPanel from '../../Atomic/organisms/ContentPanel';
import DeleteCategoryModal from '../../Atomic/organisms/DeleteCategoryModal';
import SearchPanel from '../../Atomic/organisms/ProductSearchPanel';
import TitlePanel from '../../Atomic/organisms/TitlePanel';
import Constants from '../../constants/Constants';
import { selectCategory, sortCategory } from '../../reducers/CategoryReducer';
import { openCategoryModal, openDeleteCategoryModal } from '../../reducers/LayoutReducer';


const title = [
    'STT',
    'Tên',
    'Miêu tả',
    'Thao tác',
];
const tableHeadAlign = [
    "left",
    "left",
    "left",
    "center",
]

const tableCellMinWidth = [
    "0px",
    "100px",
    "100px",
    "200px",
]

function CategoryPage(props: any) {
    const { data, loading } = useSelector(selectCategory);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCategoryRequest(true));
    }, []);

    const handleSortButton = useCallback((data: any) => {
        dispatch(sortCategory(data));
    }, [])
    const handleOpenCreateButton = useCallback(() => {
        dispatch(openCategoryModal({ data: null, openModalTo: Constants.OpenModalTo.CREATE }));
    }, [])
    const handleOpenInfoButton = useCallback((data: any) => {
        dispatch(openCategoryModal({ data, openModalTo: Constants.OpenModalTo.VIEW }));
    }, [])
    const handleOpenUpdateButton = useCallback((data: any) => {
        dispatch(openCategoryModal({ data, openModalTo: Constants.OpenModalTo.UPDATE }));
    }, [])
    const handleOpenDeleteButton = useCallback((data: any) => {
        dispatch(openDeleteCategoryModal({ data }));
    }, [])
    const handleConfirmButton = useCallback((data: any, openModalTo: string) => {
        switch (openModalTo) {
            case Constants.OpenModalTo.CREATE: dispatch(addCategoryRequest(data)); break;
            case Constants.OpenModalTo.UPDATE: dispatch(updateCategoryRequest(data)); break;
        }
    }, []);

    const convertDataIntoTable = () => {
        return data?.map((value: any, index: any) => {
            const valueArray: Array<any> = Object.values(value);
            valueArray.shift();
            valueArray.unshift(index + 1);
            valueArray.push(
                <Box display="flex" justifyContent="space-between" minWidth="180px">
                    <IconButton onClick={() => handleOpenInfoButton(value)} size="medium" edge="start" color="inherit" aria-label="menu">
                        <Visibility />
                    </IconButton>
                    <IconButton onClick={() => handleOpenUpdateButton(value)} size="medium" edge="start" color="inherit" aria-label="menu">
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
            <CategoryDialog handleConfirmButton={handleConfirmButton}></CategoryDialog>
            <DeleteCategoryModal />
            <TitlePanel title="danh mục sản phẩm" />
            <Container style={{ paddingTop: "20px", paddingBottom: "20px" }}>
                <SearchPanel handleSortButton={handleSortButton} searchLabel="danh mục sản phẩm" />
            </Container>
            <ContentPanel tableHeadAlign={tableHeadAlign} tableCellMinWidth={tableCellMinWidth} loading={loading} title="DANH MỤC SẢN PHẨM" tableTitle={title} tableData={convertDataIntoTable()} handleOpenCreateButton={handleOpenCreateButton} handleOpenInfoButton={handleOpenInfoButton} handleOpenUpdateButton={handleOpenUpdateButton} handleOpenDeleteButton={handleOpenDeleteButton}></ContentPanel>
        </React.Fragment>
    );
}

export default React.memo(CategoryPage);