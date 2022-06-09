
import { Delete, Edit, Visibility } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import { Container } from '@mui/system';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategoryRequest } from '../../actions/CategoryAction';
import CategoryDialog from '../../Atomic/organisms/CategoryDialog';
import SearchPanel from '../../Atomic/organisms/CategorySearchPanel';
import CategoryViewDialog from '../../Atomic/organisms/CategoryViewDialog';
import ConfirmDialog from '../../Atomic/organisms/ConfirmDialog';
import ContentPanel from '../../Atomic/organisms/ContentPanel';
import TitlePanel from '../../Atomic/organisms/TitlePanel';
import Constants from '../../constants/Constants';
import { selectCategory } from '../../reducers/CategoryReducer';
import { openConfirmModal, openModal, setDataConfirm, setDataModal } from '../../reducers/LayoutReducer';


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

    const handleCreateButton = useCallback(() => {
        dispatch(setDataModal({ data: null }));
        dispatch(openModal({ modalOpen: Constants.modalOpen.CATEGORY, openModalTo: Constants.OpenModalTo.CREATE }));
    }, [])
    const handleViewButton = useCallback((data: any) => {
        dispatch(setDataModal({ data }));
        dispatch(openModal({ modalOpen: Constants.modalOpen.CATEGORY, openModalTo: Constants.OpenModalTo.VIEW }));
    }, [])
    const handleUpdateButton = useCallback((data: any) => {
        dispatch(setDataModal({ data }));
        dispatch(openModal({ modalOpen: Constants.modalOpen.CATEGORY, openModalTo: Constants.OpenModalTo.UPDATE }));
    }, [])
    const handleDeleteButton = useCallback((data: any) => {
        dispatch(setDataConfirm(data));
        dispatch(openConfirmModal(Constants.needToConfirm.DELETE_CATEGORY));
    }, [])

    const convertDataIntoTable = () => {
        return data?.map((value: any, index: any) => {
            const valueArray: Array<any> = Object.values(value);
            valueArray.shift();
            valueArray.unshift(index + 1);
            valueArray.push(
                <Box display="flex" justifyContent="space-between" minWidth={"200px"}>
                    <IconButton
                        onClick={() => handleViewButton(value)}
                        size="medium"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                    >
                        <Visibility />
                    </IconButton>
                    <IconButton
                        onClick={() => handleUpdateButton(value)}
                        size="medium"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                    >
                        <Edit />
                    </IconButton>
                    <IconButton
                        onClick={() => handleDeleteButton(value)}
                        size="medium"
                        edge="start"
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
            <CategoryViewDialog />
            <CategoryDialog />
            <ConfirmDialog />
            <TitlePanel title="danh mục sản phẩm" handleCreateButton={handleCreateButton} />
            <Container style={{ paddingTop: "20px", paddingBottom: "20px" }}>
                <SearchPanel />
            </Container>
            <ContentPanel
                tableHeadAlign={tableHeadAlign}
                tableCellMinWidth={tableCellMinWidth}
                loading={loading}
                title="DANH MỤC SẢN PHẨM"
                tableTitle={title}
                tableData={convertDataIntoTable()}
            />
        </React.Fragment>
    );
}

export default React.memo(CategoryPage);