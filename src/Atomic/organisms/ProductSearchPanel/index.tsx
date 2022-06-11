import { SearchOutlined } from '@mui/icons-material';
import { Box, Button, Grid, Paper } from '@mui/material';
import { Container } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { selectCategory } from '../../../reducers/CategoryReducer';
import { sortProduct } from '../../../reducers/ProductReducer';
import CustomDropdown from '../../molecules/Dropdown';
import CustomTextInput from '../../molecules/TextInput';

const filterItem = [
    {
        value: -1,
        label: 'Mặc định'
    },
    {
        value: 1,
        label: 'Thứ tự tăng dần'
    },
    {
        value: 2,
        label: 'Thứ giảm dần'
    },
    {
        value: 3,
        label: 'Tăng dần theo tên'
    },
    {
        value: 4,
        label: 'Giảm dần theo tên'
    },
    {
        value: 5,
        label: 'Tăng dần theo số lượng'
    },
    {
        value: 6,
        label: 'Giảm dần theo số lượng'
    },
];
const typeOfSearchItem = [
    {
        value: 1,
        label: "Theo tên"
    },
    {
        value: 2,
        label: "Theo id"
    }
];


function SearchPanel(props: any) {
    const dispatch = useDispatch();
    const { data: dataCategory } = useSelector(selectCategory);

    const categoryItem = [{ value: -1, label: 'Mặc định' }];

    dataCategory.forEach((item: any) => categoryItem.push({ value: item?.id, label: item?.name }));

    const defaultValues = {
        search: "",
        category: -1,
        typeOfSearch: typeOfSearchItem[0]?.value,
        filter: filterItem[0]?.value
    };
    const { control, watch, getValues } = useForm({ defaultValues });
    const watchAllFields = watch();

    useEffect(() => {
        const data = getValues();
        dispatch(sortProduct(data));
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
                        <Grid item lg={5} md={12} xs={12}>
                            <CustomTextInput
                                label="Sản phẩm"
                                name="search"
                                InputLabelProps={{ shrink: true }}
                                placeholder={"Tìm kiếm " + typeOfSearchItem[getTypeOfSearchIndex()]?.label?.toLowerCase()}
                                control={control}
                                InputProps={{
                                    endAdornment: <SearchOutlined />
                                }}
                            />
                        </Grid>
                        <Grid item lg={2} md={12} xs={12}>
                            <CustomDropdown
                                title="Tìm kiếm theo"
                                name="typeOfSearch"
                                data={typeOfSearchItem}
                                control={control}
                            />
                        </Grid>
                        <Grid item lg={2} md={12} xs={12}>
                            <CustomDropdown
                                title="Danh mục"
                                name="category"
                                data={categoryItem}
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