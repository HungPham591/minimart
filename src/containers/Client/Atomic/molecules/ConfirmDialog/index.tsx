import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { selectLayout } from '../../../../../reducers/layout.reducer';



export interface DialogTitleProps {
    id: string;
    children?: React.ReactNode;
    onClose: () => void;
}


function ConfirmDialog(props: any) {
    const [open, setOpen] = React.useState(true);
    const { confirmModalOpen } = useSelector(selectLayout);
    const handleConfirmButton = () => {
        props?.handleConfirmButton();
        setOpen(false);
    };

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
                <Button onClick={props.handleConfirmModalCloseButton}>ĐÓNG</Button>
                <Button onClick={props?.handleConfirmButton} color="error" autoFocus>
                    XÁC NHẬN
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default React.memo(ConfirmDialog);