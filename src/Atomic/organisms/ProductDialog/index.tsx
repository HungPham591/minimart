import { Box, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';
import Helpers from '../../../commons/utils/Helpers';
import Constants from '../../../constants/Constants';
import { selectCategory } from '../../../reducers/CategoryReducer';
import { closeInputModal, selectLayout } from '../../../reducers/LayoutReducer';
import CustomDropdown from '../../atoms/Dropdown';
import CustomImage from '../../atoms/Image';
import CustomInput from '../../atoms/Input';
import InputDialog from '../InputDialog';


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

export default React.memo(ProductDialog);