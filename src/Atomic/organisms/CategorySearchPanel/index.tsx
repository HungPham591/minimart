import { SearchOutlined } from '@mui/icons-material';
import { Box, Button, Grid, Paper } from '@mui/material';
import { Container } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { useDispatch } from 'react-redux';
import { sortCategory } from '../../../reducers/CategoryReducer';
import CustomDropdown from '../../molecules/Dropdown';
import CustomTextInput from '../../molecules/TextInput';

const filterItem = [
    {
        value: -1,
        label: 'Mặc định'
    },
    {
        value: 1,
        label: 'Số thứ tự tăng dần'
    },
    {
        value: 2,
        label: 'Số thứ giảm dần'
    },
    {
        value: 3,
        label: 'Sắp xếp tăng dần theo tên'
    },
    {
        value: 4,
        label: 'Sắp xếp giảm dần theo tên'
    },
];
const typeOfSearchItem = [
    {
        value: 1,
        label: "Tìm kiếm theo tên"
    },
    {
        value: 2,
        label: "Tìm kiếm theo id"
    }
];
const defaultValues = {
    search: "",
    filter: filterItem[0].value,
    typeOfSearch: typeOfSearchItem[0].value
}


function SearchPanel(props: any) {
    const dispatch = useDispatch();

    const { control, watch, getValues } = useForm({ defaultValues });

    const watchAllFields = watch();

    useEffect(() => {
        const data = getValues();
        dispatch(sortCategory(data));
    }, [watchAllFields]);
    const getTypeOfSearchIndex = () => {
        const value = getValues()?.typeOfSearch;
        return typeOfSearchItem.findIndex(element => element.value === value);
    }

    return (
        <Paper>
            <Box paddingY="12px">
                <Container maxWidth={false}>
                    <Grid spacing={3} container>
                        <Grid item lg={6} md={12} xs={12}>
                            <CustomTextInput
                                name="search"
                                control={control}
                                InputLabelProps={{ shrink: true }}
                                placeholder={typeOfSearchItem[getTypeOfSearchIndex()]?.label?.toLowerCase()}
                                label="Danh mục sản phẩm"
                                InputProps={{
                                    endAdornment: <SearchOutlined />
                                }}
                            />
                        </Grid>
                        <Grid item lg={3} md={12} xs={12}>
                            <CustomDropdown
                                title="Sắp xếp"
                                name="typeOfSearch"
                                data={typeOfSearchItem}
                                control={control}
                            />
                        </Grid>
                        <Grid item lg={3} md={12} xs={12}>
                            <CustomDropdown
                                title="Sắp xếp"
                                name="filter"
                                data={filterItem}
                                control={control}
                            />
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Paper>
    );
}

export default React.memo(SearchPanel);