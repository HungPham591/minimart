import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeProductRequest } from '../../../actions/ProductAction';
import { closeDeleteProductModal, selectLayout } from '../../../reducers/LayoutReducer';



export interface DialogTitleProps {
    id: string;
    children?: React.ReactNode;
    onClose: () => void;
}


function DeleteProductModal(props: any) {
    const { confirmModalOpen, dataProductModal } = useSelector(selectLayout);
    const dispatch = useDispatch();

    const handleConfirmButton = () => {
        const data = { ...dataProductModal };
        dispatch(removeProductRequest(data));
        dispatch(closeDeleteProductModal(true));
    };
    const handleCloseButton = () => {
        dispatch(closeDeleteProductModal(true));
    }

    return (
        <Dialog
            open={confirmModalOpen}
            onClose={handleConfirmButton}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                Bạn có thật sự muốn xóa sản phẩm này?
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

export default React.memo(DeleteProductModal);