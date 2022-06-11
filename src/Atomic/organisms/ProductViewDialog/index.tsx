import CloseIcon from '@mui/icons-material/Close';
import { Box, Grid, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
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
                Chi tiết sản phẩm
            </BootstrapDialogTitle>
            <DialogContent dividers>
                <Box width='500px' maxWidth="70vw">
                    <Grid container spacing={3}>
                        <Grid lg={12} display="flex" justifyContent={"center"} height="150px" item>
                            <Box height="100%" width={"200px"}>
                                <CustomImage src={dataModal?.image} />
                            </Box>
                        </Grid>
                        <Grid lg={6} xs={12} item>
                            <Typography fontWeight="bold">ID</Typography>
                            <Typography>{dataModal?.id}</Typography>
                        </Grid>
                        <Grid lg={6} xs={12} item>
                            <Typography fontWeight="bold">Tên sản phẩm</Typography>
                            <Typography>{dataModal?.name}</Typography>
                        </Grid>
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
                        <Grid lg={12} xs={12} item>
                            <Typography fontWeight="bold">Mô tả</Typography>
                            <Typography>{dataModal?.description}</Typography>
                        </Grid>
                    </Grid>
                </Box>
            </DialogContent>
        </BootstrapDialog>
    );
}

export default React.memo(ProductDialog);