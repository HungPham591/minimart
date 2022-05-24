import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Constants from '../../../../../constants/constants';
import { closeInputModal, selectLayout } from '../../../../../reducers/layout.reducer';
import ClientInput from '../../atoms/Input';
import InputDialog from '../InputDialog';
import { v4 as uuid } from 'uuid';


function CategoryDialog(props: any) {
    const dispatch = useDispatch();
    const { categoryModalOpen, openModalTo, dataCategoryModal } = useSelector(selectLayout);
    const [name, setName] = useState(null);
    const [description, setDescription] = useState(null);

    const [nameError, setNameError] = useState(false);
    const [descriptionError, setDescriptionError] = useState(false);

    const helperText = "Vui lòng nhập đầy đủ";

    useEffect(() => {
        setNameError(false);
        setDescriptionError(false);
    }, [categoryModalOpen]);

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

    const checkForm = () => {
        if (name && description) return true;
        return false;
    }
    const handleConfirmButton = () => {
        if (openModalTo === Constants.OpenModalTo.CREATE && checkForm()) {
            props?.handleConfirmButton({ id: uuid(), name, description });
        }
        if (openModalTo === Constants.OpenModalTo.UPDATE && dataCategoryModal?.id)
            props?.handleConfirmButton(convertObjectToData({ id: dataCategoryModal?.id, name, description }));
        dispatch(closeInputModal(true));
    };

    const handleNameInputChange = (e: any) => {
        setName(e?.target?.value);
    }

    const handleDescriptionInputChange = (e: any) => {
        setDescription(e?.target?.value);
    }

    const handleNameInputBlur = () => {
        if (!name) setNameError(true);
        else setNameError(false);
    }
    const handleDescriptionInputBlur = () => {
        if (!description) setDescriptionError(true);
        else setDescriptionError(false);
    }

    const title =
        openModalTo === Constants.OpenModalTo.CREATE ? "Tạo mới danh mục sản phẩm" :
            openModalTo === Constants.OpenModalTo.VIEW ? "Xem danh mục sản phẩm" : "Cập nhật danh mục sản phẩm";

    return (
        <InputDialog title={title} disableConfirm={(nameError || descriptionError)} open={categoryModalOpen} handleConfirmButton={handleConfirmButton} handleCloseButton={handleCloseButton}>
            <ClientInput helperText={nameError ? helperText : ""} onBlur={handleNameInputBlur} error={nameError} onChange={handleNameInputChange} defaultValue={dataCategoryModal?.name} InputProps={{ readOnly: openModalTo === Constants.OpenModalTo.VIEW ? true : false }} read label="Tên danh mục"></ClientInput>
            <Box marginTop="10px" />
            <ClientInput helperText={descriptionError ? helperText : ""} onBlur={handleDescriptionInputBlur} error={descriptionError} onChange={handleDescriptionInputChange} defaultValue={dataCategoryModal?.description} InputProps={{ readOnly: openModalTo === Constants.OpenModalTo.VIEW ? true : false }} label="Mô tả"></ClientInput>
        </InputDialog>
    )
}

export default React.memo(CategoryDialog);