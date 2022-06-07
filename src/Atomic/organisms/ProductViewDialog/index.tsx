import CloseIcon from '@mui/icons-material/Close';
import { Box, Grid, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Constants from '../../../constants/Constants';
import { selectCategory } from '../../../reducers/CategoryReducer';
import { openModal, selectLayout } from '../../../reducers/LayoutReducer';
import CustomImage from '../../atoms/Image';

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


function ProductDialog(props: any) {
    const dispatch = useDispatch();

    const { data: dataCategory } = useSelector(selectCategory);
    const { modalOpen, openModalTo, dataModal } = useSelector(selectLayout);

    const handleCloseButton = () => {
        dispatch(openModal({ modalOpen: null, openModalTo: null }));
    }

    return (
        <BootstrapDialog
            onClose={handleCloseButton}
            aria-labelledby="customized-dialog-title"
            open={modalOpen === Constants.modalOpen.PRODUCT && openModalTo === Constants.OpenModalTo.VIEW}
        >
            <BootstrapDialogTitle id="customized-dialog-title" onClose={handleCloseButton}>
                Xem chi tiết sản phẩm
            </BootstrapDialogTitle>
            <DialogContent dividers>
                <Box width='500px' maxWidth="70vw">
                    <Box height="150px" marginBottom="10px">
                        <CustomImage src={dataModal?.image} />
                    </Box>
                    <Box marginTop="15px">
                        <Typography fontWeight="bold">Tên sản phẩm</Typography>
                        <Typography>{dataModal?.name}</Typography>
                    </Box>
                    <Box marginTop="15px" />
                    <Grid container spacing={2}>
                        <Grid lg={6} xs={12} item>
                            <Typography fontWeight="bold">Số lượng</Typography>
                            <Typography>{dataModal?.number}</Typography>
                        </Grid>
                        <Grid lg={6} xs={12} item>
                            <Typography fontWeight="bold">Danh mục</Typography>
                            <Typography>{dataCategory[dataModal?.category]?.name}</Typography>
                        </Grid>
                        <Grid lg={6} xs={12} item>
                            <Typography fontWeight="bold">Khối lượng</Typography>
                            <Typography>{dataModal?.weight}</Typography>
                        </Grid>
                        <Grid lg={6} xs={12} item>
                            <Typography fontWeight="bold">Trạng thái</Typography>
                            <Typography>{dataModal?.status ? "Còn hàng" : "Hết hàng"}</Typography>
                        </Grid>
                    </Grid>
                    <Box marginTop="15px">
                        <Typography fontWeight="bold">Mô tả</Typography>
                        <Typography>{dataModal?.description}</Typography>
                    </Box>
                </Box>
            </DialogContent>
        </BootstrapDialog>
    );
}

export default React.memo(ProductDialog);