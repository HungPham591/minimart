import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Constants from '../../../constants/Constants';
import { openModal, selectLayout } from '../../../reducers/LayoutReducer';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(3),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));


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


function CategoryDialog(props: any) {
    const dispatch = useDispatch();
    const { modalOpen, openModalTo, dataModal } = useSelector(selectLayout);

    const handleCloseButton = () => {
        dispatch(openModal({ modalOpen: null, openModalTo: null }));
    }

    return (
        <BootstrapDialog
            onClose={handleCloseButton}
            aria-labelledby="customized-dialog-title"
            open={modalOpen === Constants.modalOpen.CATEGORY && openModalTo === Constants.OpenModalTo.VIEW}
        >
            <BootstrapDialogTitle id="customized-dialog-title" onClose={handleCloseButton}>
                Xem chi tiết danh mục
            </BootstrapDialogTitle>
            <DialogContent dividers>
                <Box width='500px' maxWidth="70vw">
                    <Box>
                        <Typography fontWeight="bold">Tên danh mục sản phẩm</Typography>
                        <Typography>{dataModal?.name}</Typography>
                    </Box>
                    <Box marginTop="15px">
                        <Typography fontWeight="bold">Mô tả</Typography>
                        <Typography>{dataModal?.description}</Typography>
                    </Box>
                </Box>
            </DialogContent>
        </BootstrapDialog>
    )
}

export default React.memo(CategoryDialog);