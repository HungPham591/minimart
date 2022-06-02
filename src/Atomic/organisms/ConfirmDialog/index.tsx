import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { openConfirmModal, selectLayout } from '../../../reducers/LayoutReducer';

function ConfirmDialog(props: any) {
    const { confirmModalOpen } = useSelector(selectLayout);
    const dispatch = useDispatch();

    const handleConfirmButton = () => {
        props?.confirm();
        dispatch(openConfirmModal(null));
    };
    const handleCloseButton = () => {
        dispatch(openConfirmModal(null));
    }

    return (
        <Dialog
            open={confirmModalOpen}
            onClose={handleConfirmButton}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {props?.title}
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