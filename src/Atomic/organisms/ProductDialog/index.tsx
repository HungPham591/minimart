import CloseIcon from '@mui/icons-material/Close';
import { Box, Grid } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import { FormikProvider, useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import Constants from '../../../constants/Constants';
import { selectCategory } from '../../../reducers/CategoryReducer';
import { openConfirmModal, openModal, selectLayout, setDataConfirm } from '../../../reducers/LayoutReducer';
import CustomImage from '../../atoms/Image';
import CustomInput from '../../atoms/Input';
import CustomDropdown from '../../molecules/Dropdown';

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
    image: yup.string().url("Enter a image url").required("Image url is required"),
    category: yup.number().required("Category of product is required"),
    number: yup.number().required("Number of product is required"),
    weight: yup.number().required("Weight of product is required"),
    status: yup.boolean().required("status of product is required")
})


const statusDropdownData = [
    {
        value: true,
        label: "Còn hàng"
    },
    {
        value: false,
        label: "Hết hàng"
    }
];


function ProductDialog(props: any) {
    const dispatch = useDispatch();

    const [imageLink, setImageLink] = useState(null);

    const { data: dataCategory } = useSelector(selectCategory);
    const { modalOpen, openModalTo, dataModal } = useSelector(selectLayout);

    const categoryDropdown = () => {
        return dataCategory?.map((value: any, index: any) => {
            return {
                value: value?.id,
                label: value?.name
            }
        })
    };

    useEffect(() => {
        setImageLink(dataModal?.image ?? "");
    }, [dataModal])

    const handleCloseButton = () => {
        dispatch(openModal({ modalOpen: null, openModalTo: null }));
    }

    const handleSubmit = (data: any) => {
        data = { ...data, id: dataModal?.id };
        dispatch(setDataConfirm(data));
        if (openModalTo === Constants.OpenModalTo.CREATE) {
            dispatch(openConfirmModal(Constants.needToConfirm.ADD_PRODUCT))
        }
        else {
            dispatch(openConfirmModal(Constants.needToConfirm.UPDATE_PRODUCT))
        }
    };

    const formik = useFormik({
        initialValues: {
            name: dataModal?.name ?? "",
            description: dataModal?.description ?? "",
            image: dataModal?.image ?? "",
            category: dataModal?.category ?? categoryDropdown()[0]?.value,
            number: dataModal?.number ?? 0,
            weight: dataModal?.weight ?? 0,
            status: dataModal?.status ?? statusDropdownData[0]?.value
        },
        validationSchema: validationSchema,
        onSubmit: handleSubmit,
        enableReinitialize: true
    })

    const title =
        openModalTo === Constants.OpenModalTo.CREATE ? "Tạo mới sản phẩm" :
            openModalTo === Constants.OpenModalTo.VIEW ? "Xem sản phẩm" : "Cập nhật sản phẩm";


    return (
        <BootstrapDialog
            onClose={handleCloseButton}
            aria-labelledby="customized-dialog-title"
            open={modalOpen === Constants.modalOpen.PRODUCT && (openModalTo === Constants.OpenModalTo.CREATE || openModalTo === Constants.OpenModalTo.UPDATE)}
        >
            <FormikProvider value={formik}>
                <form onSubmit={formik.handleSubmit}>
                    <BootstrapDialogTitle id="customized-dialog-title" onClose={handleCloseButton}>
                        {title}
                    </BootstrapDialogTitle>
                    <DialogContent dividers>
                        <Box width='500px' maxWidth="70vw">
                            <Box height="150px" marginBottom="10px">
                                <CustomImage src={imageLink} />
                            </Box>
                            <CustomInput
                                name="name"
                                onChange={formik.handleChange}
                                error={formik.touched.name && Boolean(formik.errors.name)}
                                helperText={formik.touched.name && formik.errors.name}
                                value={formik.values.name}
                                label="Tên sản phẩm"
                            />
                            <Box marginTop="10px" />
                            <CustomInput
                                name="image"
                                onChange={formik.handleChange}
                                error={formik.touched.image && Boolean(formik.errors.image)}
                                helperText={formik.touched.image && formik.errors.image}
                                label="Ảnh"
                                value={formik.values.image}
                            />
                            <Box marginTop="10px" />
                            <Grid container spacing={2}>
                                <Grid lg={6} xs={12} item>
                                    <CustomInput
                                        name="number"
                                        onChange={formik.handleChange}
                                        error={formik.touched.number && Boolean(formik.errors.number)}
                                        helperText={formik.touched.number && formik.errors.number}
                                        value={formik.values.number}
                                        label="Số lượng"
                                    />
                                </Grid>
                                <Grid lg={6} xs={12} item>
                                    <CustomDropdown
                                        title="Danh mục"
                                        name="category"
                                        data={categoryDropdown()}
                                        onChange={formik.handleChange}
                                        value={formik.values.category}
                                    />
                                </Grid>
                                <Grid lg={6} xs={12} item>
                                    <CustomInput
                                        name="weight"
                                        onChange={formik.handleChange}
                                        error={formik.touched.weight && Boolean(formik.errors.weight)}
                                        helperText={formik.touched.weight && formik.errors.weight}
                                        value={formik.values.weight}
                                        label="Khối lượng"
                                    />
                                </Grid>
                                <Grid lg={6} xs={12} item>
                                    <CustomDropdown
                                        name="status"
                                        title="Trạng thái"
                                        data={statusDropdownData}
                                        value={formik.values.status}
                                        onChange={formik.handleChange}
                                    />
                                </Grid>
                            </Grid>
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
    );
}

export default React.memo(ProductDialog);