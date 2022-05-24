import CloseIcon from '@mui/icons-material/Close';
import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import { withStyles } from '@mui/styles';
import * as React from 'react';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const styles = {

}

export interface DialogTitleProps {
    id: string;
    children?: React.ReactNode;
    onClose: () => void;
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

function InputDialog(props: any) {
    return (
        <BootstrapDialog
            onClose={props?.handleCloseButton}
            aria-labelledby="customized-dialog-title"
            open={props?.open}
        >
            <BootstrapDialogTitle id="customized-dialog-title" onClose={props?.handleCloseButton}>
                {props?.title}
            </BootstrapDialogTitle>
            <DialogContent dividers>
                <Box width='500px' maxWidth="70vw">
                    {props?.children}
                </Box>
            </DialogContent>
            <DialogActions>
                <Button disabled={props?.disableConfirm} color='error' variant='contained' autoFocus onClick={props?.handleConfirmButton}>
                    Lưu
                </Button>
            </DialogActions>
        </BootstrapDialog>
    );
}

export default withStyles(styles)(InputDialog);