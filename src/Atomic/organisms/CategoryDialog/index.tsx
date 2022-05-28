import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomInput from '../../atoms/Input';
import InputDialog from '../InputDialog';
import { v4 as uuid } from 'uuid';
import { closeInputModal, selectLayout } from '../../../reducers/LayoutReducer';
import Constants from '../../../constants/Constants';
import Helpers from '../../../commons/utils/Helpers';


function CategoryDialog(props: any) {
    const dispatch = useDispatch();
    const { categoryModalOpen, openModalTo, dataCategoryModal } = useSelector(selectLayout);

    const [nameError, setNameError] = useState(false);
    const [descriptionError, setDescriptionError] = useState(false);

    const helperText = "Vui lòng nhập đúng kiểu dữ liệu và đầy đủ";

    useEffect(() => {
        setNameError(false);
        setDescriptionError(false);
    }, [categoryModalOpen])

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
        return { ...dataCategoryModal, ...newObject };
    }

    const checkForm = (name: any, description: any) => {
        let error = false;
        if (!name || Helpers.isNumeric(name)) { setNameError(true); error = true; } else setNameError(false);
        if (!description || Helpers.isNumeric(description)) { setDescriptionError(true); error = true } else setDescriptionError(false);
        return !error;
    }
    const handleSubmit = (e: any) => {
        e.preventDefault();
        const { target } = e;
        let { name, description } = target;
        name = name.value;
        description = description.value;
        if (!checkForm(name, description)) return;
        if (openModalTo === Constants.OpenModalTo.CREATE) {
            const data = {
                id: uuid(),
                name,
                description
            }
            props?.handleConfirmButton({ ...data }, openModalTo);
        }
        if (openModalTo === Constants.OpenModalTo.UPDATE && dataCategoryModal?.id) {
            const data = {
                id: dataCategoryModal?.id,
                name,
                description
            }
            props?.handleConfirmButton(convertObjectToData({ ...data }), openModalTo);
        }
        dispatch(closeInputModal(true));
    };

    const title =
        openModalTo === Constants.OpenModalTo.CREATE ? "Tạo mới danh mục sản phẩm" :
            openModalTo === Constants.OpenModalTo.VIEW ? "Xem danh mục sản phẩm" : "Cập nhật danh mục sản phẩm";

    return (
        <InputDialog title={title} readOnly={openModalTo === Constants.OpenModalTo.VIEW ? true : false} disableConfirm={(nameError || descriptionError)} open={categoryModalOpen} handleSubmit={handleSubmit} handleCloseButton={handleCloseButton}>
            <CustomInput name="name" helperText={nameError ? helperText : ""} error={nameError} defaultValue={dataCategoryModal?.name} InputProps={{ readOnly: openModalTo === Constants.OpenModalTo.VIEW ? true : false }} label="Tên danh mục"></CustomInput>
            <Box marginTop="10px" />
            <CustomInput name="description" helperText={descriptionError ? helperText : ""} error={descriptionError} defaultValue={dataCategoryModal?.description} InputProps={{ readOnly: openModalTo === Constants.OpenModalTo.VIEW ? true : false }} label="Mô tả"></CustomInput>
        </InputDialog>
    )
}

export default React.memo(CategoryDialog);