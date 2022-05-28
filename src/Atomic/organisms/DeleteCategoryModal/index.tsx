import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeCategoryRequest } from '../../../actions/CategoryAction';
import { closeDeleteCategoryModal, selectLayout } from '../../../reducers/LayoutReducer';



export interface DialogTitleProps {
    id: string;
    children?: React.ReactNode;
    onClose: () => void;
}


function DeleteCategoryModal(props: any) {
    const { confirmModalOpen, dataCategoryModal } = useSelector(selectLayout);
    const dispatch = useDispatch();

    const handleConfirmButton = () => {
        const data = { ...dataCategoryModal };
        dispatch(removeCategoryRequest(data));
        dispatch(closeDeleteCategoryModal(true));
    };
    const handleCloseButton = () => {
        dispatch(closeDeleteCategoryModal(true));
    }

    return (
        <Dialog
            open={confirmModalOpen}
            onClose={handleConfirmButton}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                Bạn có thật sự muốn xóa danh sách sản phẩm này?
            </DialogTitle>
            <DialogActions>
                <Button onClick={handleCloseButton}>ĐÓNG</Button>
                <Button onClick={handleConfirmButton} color="error" autoFocus>
                    XÁC NHẬN
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default React.memo(DeleteCategoryModal);