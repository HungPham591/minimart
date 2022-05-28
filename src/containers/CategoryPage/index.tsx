
import { Delete, Edit, Visibility } from '@mui/icons-material';
import { Box, IconButton, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Container } from '@mui/system';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCategoryRequest, fetchCategoryRequest, updateCategoryRequest } from '../../actions/CategoryAction';
import CategoryDialog from '../../Atomic/organisms/CategoryDialog';
import ContentPanel from '../../Atomic/organisms/ContentPanel';
import DeleteCategoryModal from '../../Atomic/organisms/DeleteCategoryModal';
import SearchPanel from '../../Atomic/organisms/SearchPanel';
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
                <Box display="flex">
                    <IconButton onClick={() => handleOpenInfoButton(value)} size="medium" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                        <Visibility />
                    </IconButton>
                    <IconButton onClick={() => handleOpenUpdateButton(value)} size="medium" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                        <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleOpenDeleteButton(value)} size="medium" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
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
            <TitlePanel title="danh mục sản phẩm"></TitlePanel>
            <Box position="relative" top={-40}>
                <Container>
                    <Box paddingY="5px" border={5} borderColor='secondary.main' borderRadius={1} bgcolor="white">
                        <SearchPanel handleSortButton={handleSortButton} searchLabel="danh mục sản phẩm" />
                    </Box>
                </Container>
            </Box>
            <ContentPanel loading={loading} title="DANH MỤC SẢN PHẨM" tableTitle={title} tableData={convertDataIntoTable()} handleOpenCreateButton={handleOpenCreateButton} handleOpenInfoButton={handleOpenInfoButton} handleOpenUpdateButton={handleOpenUpdateButton} handleOpenDeleteButton={handleOpenDeleteButton}></ContentPanel>
        </React.Fragment>
    );
}

export default React.memo(CategoryPage);