import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { FormikProvider, useFormik } from 'formik';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import Constants from '../../../constants/Constants';
import { openConfirmModal, openModal, selectLayout, setDataConfirm } from '../../../reducers/LayoutReducer';
import CustomInput from '../../atoms/Input';


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
    name: yup.string().required("Product name is required"),
    description: yup.string().required("Product description is required"),
})


function CategoryDialog(props: any) {
    const dispatch = useDispatch();
    const { modalOpen, openModalTo, dataModal } = useSelector(selectLayout);


    const formikInitialValue = {
        name: dataModal?.name ?? "",
        description: dataModal?.description ?? "",
    }

    const handleCloseButton = () => {
        dispatch(openModal({ modalOpen: null, openModalTo: null }));
    }

    const handleSubmit = (data: any) => {
        data = { ...data, id: dataModal?.id };
        dispatch(setDataConfirm(data));
        if (openModalTo === Constants.OpenModalTo.CREATE) {
            dispatch(openConfirmModal(Constants.needToConfirm.ADD_CATEGORY))
        }
        else {
            dispatch(openConfirmModal(Constants.needToConfirm.UPDATE_CATEGORY))
        }
    };


    const formik = useFormik({
        initialValues: formikInitialValue,
        validationSchema: validationSchema,
        onSubmit: handleSubmit,
        enableReinitialize: true
    })

    const title =
        openModalTo === Constants.OpenModalTo.CREATE ? "Tạo mới danh mục sản phẩm" : "Cập nhật danh mục sản phẩm";

    return (
        <BootstrapDialog
            onClose={handleCloseButton}
            aria-labelledby="customized-dialog-title"
            open={modalOpen === Constants.modalOpen.CATEGORY && (openModalTo === Constants.OpenModalTo.CREATE || openModalTo === Constants.OpenModalTo.UPDATE)}
        >
            <FormikProvider value={formik}>
                <form onSubmit={formik.handleSubmit}>
                    <BootstrapDialogTitle id="customized-dialog-title" onClose={handleCloseButton}>
                        {title}
                    </BootstrapDialogTitle>
                    <DialogContent dividers>
                        <Box width='500px' maxWidth="70vw">
                            <CustomInput
                                name="name"
                                onChange={formik.handleChange}
                                error={formik.touched.name && Boolean(formik.errors.name)}
                                helperText={formik.touched.name && formik.errors.name}
                                value={formik.values.name}
                                label="Tên danh mục sản phẩm"
                            />
                            <Box marginTop="10px" />
                            <CustomInput
                                multiline
                                name="description"
                                label="Mô tả"
                                rows={3}
                                error={formik.touched.description && Boolean(formik.errors.description)}
                                helperText={formik.touched.description && formik.errors.description}
                                onChange={formik.handleChange}
                                value={formik.values.description}
                            />
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Box>
                            <Button type='submit' color='error' variant='contained' autoFocus>
                                Lưu
                            </Button>
                        </Box>
                    </DialogActions>
                </form>
            </FormikProvider>
        </BootstrapDialog>
    )
}

export default React.memo(CategoryDialog);