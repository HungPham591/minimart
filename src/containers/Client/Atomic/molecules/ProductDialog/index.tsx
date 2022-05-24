import { Box, Grid } from '@mui/material';
import { withStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Constants from '../../../../../constants/constants';
import { closeInputModal, selectLayout } from '../../../../../reducers/layout.reducer';
import ClientInput from '../../atoms/Input';
import ClientTextArea from '../../atoms/TextArea';
import InputDialog from '../InputDialog';
import { v4 as uuid } from 'uuid';

const styles = {

}

function ProductDialog(props: any) {
    const dispatch = useDispatch();

    const [name, setName] = useState(null);
    const [description, setDescription] = useState(null);
    const [image, setImage] = useState(null);
    const [category, setCategory] = useState(null);
    const [weight, setWeight] = useState(null);
    const [number, setNumber] = useState(null);
    const [status, setStatus] = useState(null);

    const [nameError, setNameError] = useState(false);
    const [descriptionError, setDescriptionError] = useState(false);
    const [imageError, setImageError] = useState(false);
    const [categoryError, setCategoryError] = useState(false);
    const [weightError, setWeightError] = useState(false);
    const [numberError, setNumberError] = useState(false);
    const [statusError, setStatusError] = useState(false);

    const { productModalOpen, openModalTo, dataProductModal } = useSelector(selectLayout);

    const helperText = "Vui lòng nhập đầy đủ";

    useEffect(() => {
        setNameError(false);
        setDescriptionError(false);
        setImageError(false);
        setCategoryError(false);
        setWeightError(false);
        setNumberError(false);
        setStatusError(false);
    }, [productModalOpen]);

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
        console.log(JSON.stringify(newObject))
        return { ...dataProductModal, ...newObject, };
    }

    const handleNameInputChange = (e: any) => {
        setName(e?.target?.value);
    }
    const handleDescriptionInputChange = (e: any) => {
        setDescription(e?.target?.value);
    }
    const handleImageInputChange = (e: any) => {
        setImage(e?.target?.value);
    }
    const handleCategoryInputChange = (e: any) => {
        setCategory(e?.target?.value);
    }
    const handleWeightInputChange = (e: any) => {
        setWeight(e?.target?.value);
    }
    const handleNumberInputChange = (e: any) => {
        setNumber(e?.target?.value);
    }
    const handleStatusInputChange = (e: any) => {
        setStatus(e?.target?.value);
    }

    const handleNameInputBlur = (e: any) => {
        if (!name) setNameError(true);
        else setNameError(false);
    }
    const handleDescriptionInputBlur = (e: any) => {
        if (!description) setDescriptionError(true);
        else setDescriptionError(false);
    }
    const handleImageInputBlur = (e: any) => {
        if (!image) setImageError(true);
        else setImageError(false);
    }
    const handleCategoryInputBlur = (e: any) => {
        if (!category) setCategoryError(true);
        else setCategoryError(false);
    }
    const handleWeightInputBlur = (e: any) => {
        if (!weight) setWeightError(true);
        else setWeightError(false);
    }
    const handleNumberInputBlur = (e: any) => {
        if (!number) setNumberError(true);
        else setNumberError(false);
    }
    const handleStatusInputBlur = (e: any) => {
        if (!status) setStatusError(true);
        else setStatusError(false);
    }

    const handleConfirmButton = () => {
        if (openModalTo === Constants.OpenModalTo.CREATE) {
            props?.handleConfirmButton({ id: uuid(), name, description, category, image, weight, number, status });
        }
        if (openModalTo === Constants.OpenModalTo.UPDATE && dataProductModal?.id)
            props?.handleConfirmButton(convertObjectToData({ id: dataProductModal?.id, name, description, category, image, weight, number, status }));
        dispatch(closeInputModal(true));
    };

    const title =
        openModalTo === Constants.OpenModalTo.CREATE ? "Tạo mới sản phẩm" :
            openModalTo === Constants.OpenModalTo.VIEW ? "Xem sản phẩm" : "Cập nhật sản phẩm";

    return (
        <InputDialog title={title} open={productModalOpen} handleConfirmButton={handleConfirmButton} handleCloseButton={handleCloseButton}>
            <ClientInput error={nameError} onBlur={handleNameInputBlur} helperText={nameError ? helperText : ""} onChange={handleNameInputChange} defaultValue={dataProductModal?.name} InputProps={{ readOnly: openModalTo === Constants.OpenModalTo.VIEW ? true : false }} label="Tên sản phẩm"></ClientInput>
            <Box marginTop="10px" />
            <ClientInput error={imageError} onBlur={handleImageInputBlur} helperText={imageError ? helperText : ""} onChange={handleImageInputChange} label="Ảnh" defaultValue={dataProductModal?.image} InputProps={{ readOnly: openModalTo === Constants.OpenModalTo.VIEW ? true : false }}></ClientInput>
            <Box marginTop="10px" />
            <Grid container spacing={3}>
                <Grid lg={6} xs={12} item>
                    <ClientInput error={numberError} onBlur={handleNumberInputBlur} helperText={numberError ? helperText : ""} onChange={handleNumberInputChange} label="Số lượng" defaultValue={dataProductModal?.number} InputProps={{ readOnly: openModalTo === Constants.OpenModalTo.VIEW ? true : false }}></ClientInput>
                </Grid>
                <Grid lg={6} xs={12} item>
                    <ClientInput error={categoryError} onBlur={handleCategoryInputBlur} helperText={categoryError ? helperText : ""} onChange={handleCategoryInputChange} label="Danh mục" defaultValue={dataProductModal?.category} InputProps={{ readOnly: openModalTo === Constants.OpenModalTo.VIEW ? true : false }}></ClientInput>
                </Grid>
                <Grid lg={6} xs={12} item>
                    <ClientInput error={weightError} onBlur={handleWeightInputBlur} helperText={weightError ? helperText : ""} onChange={handleWeightInputChange} label="Khối lượng" defaultValue={dataProductModal?.weight} InputProps={{ readOnly: openModalTo === Constants.OpenModalTo.VIEW ? true : false }}></ClientInput>
                </Grid>
                <Grid lg={6} xs={12} item>
                    <ClientInput error={statusError} onBlur={handleStatusInputBlur} helperText={statusError ? helperText : ""} onChange={handleStatusInputChange} label="Tình trạng" defaultValue={dataProductModal?.status} InputProps={{ readOnly: openModalTo === Constants.OpenModalTo.VIEW ? true : false }}></ClientInput>
                </Grid>
            </Grid>
            <Box marginTop="10px" />
            <ClientTextArea error={descriptionError} onBlur={handleDescriptionInputBlur} helperText={descriptionError ? helperText : ""} onChange={handleDescriptionInputChange} label="Mô tả" defaultValue={dataProductModal?.description} InputProps={{ readOnly: openModalTo === Constants.OpenModalTo.VIEW ? true : false }}></ClientTextArea>
        </InputDialog>
    );
}

export default withStyles(styles)(ProductDialog);