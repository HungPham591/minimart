import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { addCategoryRequest, removeCategoryRequest, updateCategoryRequest } from '../../../actions/CategoryAction';
import { addProductRequest, removeProductRequest, updateProductRequest } from '../../../actions/ProductAction';
import Constants from '../../../constants/Constants';
import { openConfirmModal, openModal, selectLayout, setDataModal } from '../../../reducers/LayoutReducer';

function ConfirmDialog(props: any) {
    const dispatch = useDispatch();
    const { confirmModalOpen, dataConfirm } = useSelector(selectLayout);
    let title = ""

    switch (confirmModalOpen) {
        case Constants.needToConfirm.ADD_CATEGORY: title = "Bạn có chắc chắn muốn thêm danh mục sản phẩm này?"; break;
        case Constants.needToConfirm.UPDATE_CATEGORY: title = "Bạn có chắc chắn muốn cập nhật danh mục sản phẩm này?"; break;
        case Constants.needToConfirm.DELETE_CATEGORY: title = "Bạn có chắc chắn muốn xóa sản phẩm này?"; break;
        case Constants.needToConfirm.ADD_PRODUCT: title = "Bạn có chắc chắn muốn thêm sản phẩm này?"; break;
        case Constants.needToConfirm.UPDATE_PRODUCT: title = "Bạn có chắc chắn muốn cập nhật sản phẩm này?"; break;
        case Constants.needToConfirm.DELETE_PRODUCT: title = "Bạn có chắc chắn muốn xóa sản phẩm này?"; break;
    }

    const convertCategoryToObject = (object: any) => {
        const newObject = {
            id: object?.id ?? uuid(),
            name: object?.name,
            description: object?.description
        }
        return newObject;
    }
    const convertProductToObject = (object: any) => {
        const newObject = {
            id: object?.id ?? uuid(),
            name: object?.name,
            category: object?.category,
            image: object?.image,
            description: object?.description,
            number: object?.number,
            weight: object?.weight,
            status: object?.status
        }
        return newObject;
    }

    const handleCloseButton = () => {
        dispatch(openConfirmModal(null));
    }

    const handleAddCategory = () => {
        const data = convertCategoryToObject(dataConfirm);
        dispatch(addCategoryRequest(data));
    }
    const handleUpdateCategory = () => {
        const data = convertCategoryToObject(dataConfirm);
        dispatch(updateCategoryRequest(data));
    }
    const handleDeleteCategory = () => {
        const data = convertCategoryToObject(dataConfirm);
        dispatch(removeCategoryRequest(data));
    }
    const handleAddProduct = () => {
        const data = convertProductToObject(dataConfirm);
        dispatch(addProductRequest(data));
    }
    const handleUpdateProduct = () => {
        const data = convertProductToObject(dataConfirm);
        dispatch(updateProductRequest(data));
    }
    const handleDeleteProduct = () => {
        const data = convertProductToObject(dataConfirm);
        dispatch(removeProductRequest(data));
    }

    const closeDialog = () => {
        dispatch(openConfirmModal(null));
        dispatch(openModal(null))
        dispatch(setDataModal(null));
    }

    const handleConfirmButton = (data: any) => {
        switch (confirmModalOpen) {
            case Constants.needToConfirm.ADD_CATEGORY: handleAddCategory(); break;
            case Constants.needToConfirm.UPDATE_CATEGORY: handleUpdateCategory(); break;
            case Constants.needToConfirm.DELETE_CATEGORY: handleDeleteCategory(); break;
            case Constants.needToConfirm.ADD_PRODUCT: handleAddProduct(); break;
            case Constants.needToConfirm.UPDATE_PRODUCT: handleUpdateProduct(); break;
            case Constants.needToConfirm.DELETE_PRODUCT: handleDeleteProduct(); break;
        }
        closeDialog();
    };

    return (
        <Dialog
            open={confirmModalOpen ? true : false}
            onClose={closeDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {title}
            </DialogTitle>
            <DialogActions>
                <Button onClick={handleCloseButton}>ĐÓNG</Button>
                <Button onClick={handleConfirmButton} color="error" autoFocus>
                    XÁC NHẬN
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default React.memo(ConfirmDialog);