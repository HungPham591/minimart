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
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';
import Helpers from '../../../commons/utils/Helpers';
import Constants from '../../../constants/Constants';
import { selectCategory } from '../../../reducers/CategoryReducer';
import { closeInputModal, selectLayout } from '../../../reducers/LayoutReducer';
import CustomImage from '../../atoms/Image';
import CustomInput from '../../atoms/Input';
import CustomDropdown from '../../molecules/Dropdown';
import * as yup from 'yup';
import { useFormik } from 'formik';
import InputDialog from '../InputDialog';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
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

    const { data: dataCategory } = useSelector(selectCategory);
    const { productModalOpen, openModalTo, dataProductModal } = useSelector(selectLayout);
    const { data: dataProduct } = useSelector(selectCategory);

    const categoryDropdown = () => {
        return dataProduct?.map((value: any, index: any) => {
            return {
                value: value?.id,
                label: value?.name
            }
        })
    };

    useEffect(() => {
        setCategory(dataProductModal?.category ?? categoryDropdown()[0]?.value);
    }, [dataCategory]);

    const [imageLink, setImageLink] = useState(null);
    const [category, setCategory] = useState(null);
    const [status, setStatus] = useState(dataProductModal?.status ?? statusDropdownData[0]?.value);

    const [nameError, setNameError] = useState(false);
    const [descriptionError, setDescriptionError] = useState(false);
    const [imageError, setImageError] = useState(false);
    const [weightError, setWeightError] = useState(false);
    const [numberError, setNumberError] = useState(false);


    const helperText = "Vui lòng nhập đúng kiểu dữ liệu và đầy đủ";

    useEffect(() => {
        setImageLink(null);
        setNameError(false);
        setDescriptionError(false);
        setImageError(false);
        setWeightError(false);
        setNumberError(false);
    }, [productModalOpen]);
    useEffect(() => {
        setImageLink(dataProductModal?.image ?? "");
    }, [dataProductModal])

    const handleCloseButton = () => {
        dispatch(closeInputModal(true));
    }

    const removeNullValueFromObject = (object: any) => {
        Object.keys(object).forEach(key => {
            if (object[key] === null) {
                delete object[key];
            }
        });
        return object;
    }
    const convertObjectToData = (object: any) => {
        const newObject = removeNullValueFromObject(object);
        return { ...dataProductModal, ...newObject, };
    }
    const handleCategoryInputChange = (e: any) => {
        setCategory(e?.target?.value);
    }
    const handleStatusInputChange = (e: any) => {
        setStatus(e?.target?.value);
    }
    const handleImageLinkChange = (e: any) => {
        setImageLink(e?.target?.value);
    }
    const checkForm = ({ name, description, image, weight, number }: any) => {
        let error = false;
        if (!name || Helpers.isNumeric(name)) { setNameError(true); error = true } else setNameError(false);
        if (!description || Helpers.isNumeric(description)) { setDescriptionError(true); error = true } else setDescriptionError(false);
        if (!image || !Helpers.isHttpUrl(image)) { setImageError(true); error = true } else setImageError(false);
        if (!weight || !Helpers.isNumeric(weight)) { setWeightError(true); error = true } else setWeightError(false);
        if (!number || !Helpers.isNumeric(number)) { setNumberError(true); error = true } else setNumberError(false);
        return !error;
    }
    const handleSubmit = (e: any) => {
        e.preventDefault();
        const { target } = e;
        let { name, description, image, number, weight } = target;
        name = name.value;
        description = description.value;
        image = image.value;
        number = number.value;
        weight = weight.value;
        if (!checkForm({ name, description, image, weight, number })) return;
        if (openModalTo === Constants.OpenModalTo.CREATE) {
            const data = {
                id: uuid(),
                name,
                category,
                image,
                description,
                number,
                weight,
                status
            }
            props?.handleConfirmButton({ ...data }, openModalTo);
        }
        if (openModalTo === Constants.OpenModalTo.UPDATE && dataProductModal?.id) {
            const data = {
                id: dataProductModal?.id,
                name,
                description,
                category,
                image,
                weight,
                number,
                status,
            }
            props?.handleConfirmButton(convertObjectToData({ ...data }), openModalTo);
        }
        dispatch(closeInputModal(true));
    };

    const title =
        openModalTo === Constants.OpenModalTo.CREATE ? "Tạo mới sản phẩm" :
            openModalTo === Constants.OpenModalTo.VIEW ? "Xem sản phẩm" : "Cập nhật sản phẩm";

    return (
        <InputDialog title={title} readOnly={openModalTo === Constants.OpenModalTo.VIEW ? true : false} open={productModalOpen} handleSubmit={handleSubmit} handleCloseButton={handleCloseButton}>
            <Box height="150px" marginBottom="10px">
                <CustomImage src={imageLink} />
            </Box>
            <CustomInput name="name" error={nameError} helperText={nameError ? helperText : ""} defaultValue={dataProductModal?.name} InputProps={{ readOnly: openModalTo === Constants.OpenModalTo.VIEW ? true : false }} label="Tên sản phẩm"></CustomInput>
            <Box marginTop="10px" />
            <CustomInput name="image" onChange={handleImageLinkChange} error={imageError} helperText={imageError ? helperText : ""} label="Ảnh" defaultValue={dataProductModal?.image} InputProps={{ readOnly: openModalTo === Constants.OpenModalTo.VIEW ? true : false }}></CustomInput>
            <Box marginTop="10px" />
            <Grid container spacing={2}>
                <Grid lg={6} xs={12} item>
                    <CustomInput name="number" error={numberError} helperText={numberError ? helperText : ""} label="Số lượng" defaultValue={dataProductModal?.number} InputProps={{ readOnly: openModalTo === Constants.OpenModalTo.VIEW ? true : false }}></CustomInput>
                </Grid>
                <Grid lg={6} xs={12} item>
                    <CustomDropdown title="Danh mục" data={categoryDropdown()} defaultValue={category} onChange={handleCategoryInputChange} disabled={openModalTo === Constants.OpenModalTo.VIEW ? true : false} />
                </Grid>
                <Grid lg={6} xs={12} item>
                    <CustomInput name="weight" error={weightError} helperText={weightError ? helperText : ""} label="Khối lượng" defaultValue={dataProductModal?.weight} InputProps={{ readOnly: openModalTo === Constants.OpenModalTo.VIEW ? true : false }}></CustomInput>
                </Grid>
                <Grid lg={6} xs={12} item>
                    <CustomDropdown title="Trạng thái" data={statusDropdownData} defaultValue={status} onChange={handleStatusInputChange} disabled={openModalTo === Constants.OpenModalTo.VIEW ? true : false} />
                </Grid>
            </Grid>
            <Box marginTop="10px" />
            <CustomInput multiline name="description" rows={3} error={descriptionError} helperText={descriptionError ? helperText : ""} label="Mô tả" defaultValue={dataProductModal?.description} InputProps={{ readOnly: openModalTo === Constants.OpenModalTo.VIEW ? true : false }}></CustomInput>
        </InputDialog>
    );
}

// function ProductDialog(props: any) {
//     const dispatch = useDispatch();

//     const [imageLink, setImageLink] = useState(null);
//     const [category, setCategory] = useState(null);

//     const { data: dataCategory } = useSelector(selectCategory);
//     const { productModalOpen, openModalTo, dataProductModal } = useSelector(selectLayout);
//     const { data: dataProduct } = useSelector(selectCategory);

//     const helperText = "Vui lòng nhập đúng kiểu dữ liệu và đầy đủ";


//     const categoryDropdown = () => {
//         return dataProduct?.map((value: any, index: any) => {
//             return {
//                 value: value?.id,
//                 label: value?.name
//             }
//         })
//     };

//     useEffect(() => {
//         setCategory(dataProductModal?.category ?? categoryDropdown()[0]?.value);
//     }, [dataCategory]);


//     useEffect(() => {
//         setImageLink(dataProductModal?.image ?? "");
//     }, [dataProductModal])

//     const handleCloseButton = () => {
//         dispatch(closeInputModal(true));
//     }



//     const handleSubmit = (e: any) => {

//     };

//     const formik = useFormik({
//         initialValues: {},
//         validationSchema: validationSchema,
//         onSubmit: handleSubmit
//     })

//     const title =
//         openModalTo === Constants.OpenModalTo.CREATE ? "Tạo mới sản phẩm" :
//             openModalTo === Constants.OpenModalTo.VIEW ? "Xem sản phẩm" : "Cập nhật sản phẩm";


//     return (
//         <BootstrapDialog
//             onClose={handleCloseButton}
//             aria-labelledby="customized-dialog-title"
//             open={productModalOpen}
//         >
//             {/* <form onSubmit={formik.handleSubmit}>
//                 <BootstrapDialogTitle id="customized-dialog-title" onClose={handleCloseButton}>
//                     {title}
//                 </BootstrapDialogTitle>
//                 <DialogContent dividers>
//                     <Box width='500px' maxWidth="70vw">
//                         <Box height="150px" marginBottom="10px">
//                             <CustomImage src={imageLink} />
//                         </Box>
//                         <CustomInput name="name" error={ } helperText={ } defaultValue={ } label="Tên sản phẩm" />
//                         <Box marginTop="10px" />
//                         <CustomInput name="image" onChange={ } error={ } helperText={ } label="Ảnh" defaultValue={ } />
//                         <Box marginTop="10px" />
//                         <Grid container spacing={2}>
//                             <Grid lg={6} xs={12} item>
//                                 <CustomInput name="number" error={ } helperText={ } label="Số lượng" defaultValue={ } />
//                             </Grid>
//                             <Grid lg={6} xs={12} item>
//                                 <CustomDropdown title="Danh mục" data={categoryDropdown()} defaultValue={ } onChange={ } />
//                             </Grid>
//                             <Grid lg={6} xs={12} item>
//                                 <CustomInput name="weight" error={ } helperText={ } label="Khối lượng" defaultValue={ } />
//                             </Grid>
//                             <Grid lg={6} xs={12} item>
//                                 <CustomDropdown title="Trạng thái" data={ } defaultValue={ } onChange={ } />
//                             </Grid>
//                         </Grid>
//                         <Box marginTop="10px" />
//                         <CustomInput multiline name="description" rows={3} error={ } helperText={ } label="Mô tả" defaultValue={ } />

//                     </Box>
//                 </DialogContent>
//                 <DialogActions>
//                     <Box>
//                         <Button type='submit' color='error' variant='contained' autoFocus>
//                             Lưu
//                         </Button>
//                     </Box>
//                 </DialogActions>
//             </form> */}
//         </BootstrapDialog>
//     );
// }

export default React.memo(ProductDialog);