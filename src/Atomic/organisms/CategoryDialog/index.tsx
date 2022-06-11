import { yupResolver } from '@hookform/resolvers/yup';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import Constants from '../../../constants/Constants';
import { openConfirmModal, openModal, selectLayout, setDataConfirm, setDataModal } from '../../../reducers/LayoutReducer';
import CustomTextInput from '../../molecules/TextInput';


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

const validationSchema = yup.object({
    name: yup.string().required(),
    description: yup.string().required(),
})



function CategoryDialog(props: any) {
    const dispatch = useDispatch();
    const { modalOpen, openModalTo, dataModal } = useSelector(selectLayout);

    const resolver = yupResolver(validationSchema);
    const [title, setTitle] = useState("");

    const defaultValues = {
        name: dataModal?.name ?? "",
        description: dataModal?.description ?? "",
    }

    const { handleSubmit, control, formState: { errors, isDirty }, reset, clearErrors } = useForm({ resolver, defaultValues });

    useEffect(() => {
        clearErrors();
    }, [modalOpen])
    useEffect(() => {
        reset(defaultValues);
    }, [dataModal]);

    const handleCloseButton = () => {
        dispatch(setDataModal({ data: null }));
        dispatch(openModal({ modalOpen: null, openModalTo: null }));
    }

    const onSubmit = (data: any) => {
        data = { ...data, id: dataModal?.id };
        dispatch(setDataConfirm(data));
        if (openModalTo === Constants.OpenModalTo.CREATE) {
            dispatch(openConfirmModal(Constants.needToConfirm.ADD_CATEGORY))
        }
        else {
            dispatch(openConfirmModal(Constants.needToConfirm.UPDATE_CATEGORY))
        }
    };
    useEffect(() => {
        if (openModalTo) {
            setTitle(openModalTo === Constants.OpenModalTo.CREATE ? "Tạo mới danh mục sản phẩm" : "Cập nhật danh mục sản phẩm");
        }
    }, [openModalTo])


    return (
        <BootstrapDialog
            onClose={handleCloseButton}
            aria-labelledby="customized-dialog-title"
            open={modalOpen === Constants.modalOpen.CATEGORY && (openModalTo === Constants.OpenModalTo.CREATE || openModalTo === Constants.OpenModalTo.UPDATE)}
        >
            <BootstrapDialogTitle id="customized-dialog-title" onClose={handleCloseButton}>
                {title}
            </BootstrapDialogTitle>
            <DialogContent dividers>
                <Box width='500px' maxWidth="70vw">
                    <Grid container spacing={3}>
                        <Grid lg={12} xs={12} item>
                            <CustomTextInput
                                name="name"
                                control={control}
                                label="Tên danh mục sản phẩm"
                                errors={errors}
                            />
                        </Grid>
                        <Grid lg={12} xs={12} item>
                            <CustomTextInput
                                name="description"
                                control={control}
                                label="Mô tả mục sản phẩm"
                                errors={errors} />
                        </Grid>
                    </Grid>
                </Box>
            </DialogContent>
            <DialogActions>
                <Box>
                    <Button onClick={handleSubmit(onSubmit)} disabled={!isDirty} color='error' variant='contained' autoFocus>
                        Lưu
                    </Button>
                </Box>
            </DialogActions>
        </BootstrapDialog >
    )
}

export default React.memo(CategoryDialog);