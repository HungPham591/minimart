import { yupResolver } from '@hookform/resolvers/yup';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Grid } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import { useForm, useWatch } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import Constants from '../../../constants/Constants';
import { selectCategory } from '../../../reducers/CategoryReducer';
import { openConfirmModal, openModal, selectLayout, setDataConfirm, setDataModal } from '../../../reducers/LayoutReducer';
import CustomImage from '../../atoms/Image';
import CustomDropdown from '../../molecules/Dropdown';
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
    image: yup.string().url().required(),
    category: yup.number().required(),
    number: yup.number().required().min(1),
    weight: yup.number().required().min(1),
    status: yup.boolean().required()
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
        return dataCategory.length !== 0 ? dataCategory?.map((value: any, index: any) => {
            return {
                value: value?.id,
                label: value?.name
            }
        }) : [{ value: -1, label: "mặc định" }];
    };
    const defaultValues = {
        name: dataModal?.name ?? "",
        description: dataModal?.description ?? "",
        image: dataModal?.image ?? "",
        category: dataModal?.category ?? categoryDropdown()[0]?.value,
        number: dataModal?.number ?? 0,
        weight: dataModal?.weight ?? 0,
        status: dataModal?.status ?? statusDropdownData[0]?.value
    }

    const resolver = yupResolver(validationSchema);
    const { handleSubmit, control, formState: { errors, isDirty }, reset, clearErrors } = useForm({ resolver, defaultValues });

    const watchImageChange = useWatch({
        control,
        name: "image"
    });

    useEffect(() => {
        setImageLink(watchImageChange);
    }, [watchImageChange])

    useEffect(() => {
        clearErrors();
    }, [modalOpen])
    useEffect(() => {
        setImageLink(dataModal?.image ?? "");
        reset(defaultValues);
    }, [dataModal])

    useEffect(() => {
        if (dataCategory.length !== 0) {
            reset(defaultValues);
        }
    }, [dataCategory])

    const handleCloseButton = () => {
        dispatch(setDataModal({ data: null }));
        dispatch(openModal({ modalOpen: null, openModalTo: null }));
    }

    const onSubmit = (data: any) => {
        data = { ...data, id: dataModal?.id };
        dispatch(setDataConfirm(data));
        if (openModalTo === Constants.OpenModalTo.CREATE) {
            dispatch(openConfirmModal(Constants.needToConfirm.ADD_PRODUCT))
        }
        else {
            dispatch(openConfirmModal(Constants.needToConfirm.UPDATE_PRODUCT))
        }
    };


    const title =
        openModalTo === Constants.OpenModalTo.CREATE ? "Tạo mới sản phẩm" :
            openModalTo === Constants.OpenModalTo.VIEW ? "Xem sản phẩm" : "Cập nhật sản phẩm";


    return (
        <BootstrapDialog
            onClose={handleCloseButton}
            aria-labelledby="customized-dialog-title"
            open={modalOpen === Constants.modalOpen.PRODUCT && (openModalTo === Constants.OpenModalTo.CREATE || openModalTo === Constants.OpenModalTo.UPDATE)}
        >
            <BootstrapDialogTitle id="customized-dialog-title" onClose={handleCloseButton}>
                {title}
            </BootstrapDialogTitle>
            <DialogContent dividers>
                <Box width='500px' maxWidth="70vw">
                    <Box height="150px" width={"100%"} display={"flex"} justifyContent="center" marginBottom="10px">
                        <Box height="100%" width={"200px"}>
                            <CustomImage src={imageLink} />
                        </Box>
                    </Box>
                    <CustomTextInput
                        name="name"
                        errors={errors}
                        control={control}
                        label="Tên sản phẩm"
                    />
                    <Box marginTop="10px" />
                    <CustomTextInput
                        name="image"
                        control={control}
                        errors={errors}
                        label="Ảnh"
                    />
                    <Box marginTop="10px" />
                    <Grid container spacing={2}>
                        <Grid lg={6} xs={12} item>
                            <CustomTextInput
                                name="number"
                                control={control}
                                errors={errors}
                                label="Số lượng"
                            />
                        </Grid>
                        <Grid lg={6} xs={12} item>
                            <CustomDropdown
                                title="Danh mục"
                                name="category"
                                data={categoryDropdown()}
                                control={control}
                            />
                        </Grid>
                        <Grid lg={6} xs={12} item>
                            <CustomTextInput
                                name="weight"
                                control={control}
                                errors={errors}
                                label="Khối lượng"
                            />
                        </Grid>
                        <Grid lg={6} xs={12} item>
                            <CustomDropdown
                                name="status"
                                title="Trạng thái"
                                data={statusDropdownData}
                                control={control}
                            />
                        </Grid>
                    </Grid>
                    <Box marginTop="10px" />
                    <CustomTextInput
                        multiline
                        name="description"
                        label="Mô tả"
                        rows={3}
                        control={control}
                        errors={errors}
                    />

                </Box>
            </DialogContent>
            <DialogActions>
                <Box>
                    <Button onClick={handleSubmit(onSubmit)} color='error' disabled={!isDirty} variant='contained' autoFocus>
                        Lưu
                    </Button>
                </Box>
            </DialogActions>
        </BootstrapDialog>
    );
}

export default React.memo(ProductDialog);